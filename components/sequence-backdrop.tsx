"use client";

import { useEffect, useRef, useState } from "react";
import { backgroundFrameUrl } from "../lib/asset";

const INTRO = { start: 1, end: 112 };
const LOOP = { start: 113, end: 193 };
const OUTRO = { start: 194, end: 300 };

const PRELOAD_WINDOW = 4;

const cache = new Map<string, HTMLImageElement>();

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalize(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return clamp((value - min) / (max - min), 0, 1);
}

function frameKey(frame: number) {
  return backgroundFrameUrl(frame);
}

function preload(frame: number) {
  const src = frameKey(frame);
  const cached = cache.get(src);
  if (cached) return cached;

  const image = new Image();
  image.decoding = "async";
  image.src = src;
  cache.set(src, image);
  return image;
}

function drawFrame(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement,
) {
  if (!width || !height || !image.naturalWidth || !image.naturalHeight) return;

  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  context.clearRect(0, 0, width, height);
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export default function SequenceBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeFrameRef = useRef(1);
  const activeImageRef = useRef<HTMLImageElement | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const drawPendingRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0, scale: 1 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let cancelled = false;

    const refreshSections = () => {
      sectionsRef.current = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    };

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2.25);
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeRef.current = { width, height, scale };
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      if (activeImageRef.current) {
        drawFrame(context, width, height, activeImageRef.current);
      }

      refreshSections();
    };

    const draw = (frame: number) => {
      const image = preload(frame);
      const finishDraw = () => {
        if (cancelled || activeFrameRef.current !== frame) return;
        activeImageRef.current = image;
        drawFrame(context, sizeRef.current.width || window.innerWidth, sizeRef.current.height || window.innerHeight, image);
      };

      if (image.complete && image.naturalWidth > 0) {
        finishDraw();
      } else {
        image.onload = finishDraw;
      }
    };

    const readActiveFrame = () => {
      if (cancelled) return;

      if (window.scrollY <= 2) {
        const startFrame = INTRO.start;
        if (startFrame !== activeFrameRef.current) {
          activeFrameRef.current = startFrame;
          draw(startFrame);
        }

        for (let frame = INTRO.start; frame <= Math.min(INTRO.start + PRELOAD_WINDOW, 300); frame += 1) {
          preload(frame);
        }
        return;
      }

      let sections = sectionsRef.current;
      if (sections.length === 0) {
        refreshSections();
        sections = sectionsRef.current;
      }
      const viewportCenter = window.innerHeight * 0.5;

      let sceneIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;
      let sceneProgress = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const distance = Math.abs(midpoint - viewportCenter);
        const progress = normalize(viewportCenter, rect.top, rect.bottom);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          sceneIndex = index;
          sceneProgress = progress;
        }
      });

      const totalSections = sections.length;
      const isIntro = sceneIndex === 0;
      const isOutro = totalSections > 0 && sceneIndex === totalSections - 1;
      let nextFrame = activeFrameRef.current;
      const easedSceneProgress = easeInOutCubic(sceneProgress);

      if (isIntro) {
        const range = INTRO.end - INTRO.start + 1;
        nextFrame = INTRO.start + Math.floor(easedSceneProgress * range);
      } else if (isOutro) {
        const range = OUTRO.end - OUTRO.start + 1;
        nextFrame = OUTRO.start + Math.floor(easedSceneProgress * range);
      } else {
        const range = LOOP.end - LOOP.start + 1;
        const virtualProgress = Math.max(0, sceneIndex - 1) + easedSceneProgress;
        const loopStep = ((Math.floor(virtualProgress * range) % range) + range) % range;
        nextFrame = LOOP.start + loopStep;
      }

      nextFrame = clamp(nextFrame, 1, 300);
      if (nextFrame !== activeFrameRef.current) {
        activeFrameRef.current = nextFrame;
        draw(nextFrame);
      }

      const preloadStart = clamp(nextFrame - PRELOAD_WINDOW, 1, 300);
      const preloadEnd = clamp(nextFrame + PRELOAD_WINDOW, 1, 300);
      for (let frame = preloadStart; frame <= preloadEnd; frame += 1) {
        preload(frame);
      }
    };

    const scheduleRender = () => {
      if (drawPendingRef.current) return;

      drawPendingRef.current = true;
      rafRef.current = window.requestAnimationFrame(() => {
        drawPendingRef.current = false;
        readActiveFrame();
      });
    };

    resize();
    refreshSections();
    draw(activeFrameRef.current);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", scheduleRender, { passive: true });
    scheduleRender();

    return () => {
      cancelled = true;
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scheduleRender);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="cinematicBackdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="sequenceCanvas" />
      <div className="sequenceOverlay" />
      <div className="sequenceNoise" />
      <div className="sequenceGlow" />
      <div className="sequenceVignette" />
    </div>
  );
}
