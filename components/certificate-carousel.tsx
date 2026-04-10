"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PdfPreview from "./pdf-preview";
import type { CertificateItem } from "../lib/content";
import { globalCertificatePdfUrl } from "../lib/asset";

type CertificateCarouselProps = {
  certificates: CertificateItem[];
  onOpen: (certificate: CertificateItem) => void;
};

export default function CertificateCarousel({ certificates, onOpen }: CertificateCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    let deltaBuffer = 0;
    let locked = false;
    let lockTimer: number | null = null;
    let exitTimer: number | null = null;
    let armedExitDirection: number | null = null;
    const stepThreshold = 24;
    const lockDuration = 420;
    const exitDelay = 220;

    const clearExitTimer = () => {
      if (exitTimer !== null) {
        window.clearTimeout(exitTimer);
        exitTimer = null;
      }
    };

    const disarmExit = () => {
      armedExitDirection = null;
      clearExitTimer();
    };

    const armExit = (scrollDirection: number) => {
      if (scrollDirection === 0) return;

      clearExitTimer();
      exitTimer = window.setTimeout(() => {
        exitTimer = null;

        const atBoundary =
          (scrollDirection > 0 && indexRef.current === certificates.length - 1) ||
          (scrollDirection < 0 && indexRef.current === 0);

        if (!locked && atBoundary && Math.abs(deltaBuffer) < stepThreshold) {
          armedExitDirection = scrollDirection;
          deltaBuffer = 0;
        }
      }, exitDelay);
    };

    const tryAdvance = () => {
      if (locked) return;
      if (Math.abs(deltaBuffer) < stepThreshold) return;

      const scrollDirection = deltaBuffer > 0 ? 1 : -1;
      const nextIndex = indexRef.current + scrollDirection;

      if (nextIndex < 0 || nextIndex >= certificates.length) {
        deltaBuffer = 0;
        armExit(scrollDirection);
        return;
      }

      deltaBuffer -= scrollDirection * stepThreshold;
      locked = true;
      disarmExit();
      setDirection(scrollDirection);
      setIndex(nextIndex);

      lockTimer = window.setTimeout(() => {
        locked = false;
        lockTimer = null;
        tryAdvance();
      }, lockDuration);
    };

    const onWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const isActive = rect.top < vh * 0.92 && rect.bottom > vh * 0.08;
      if (!isActive) {
        disarmExit();
        return;
      }

      const wheelDirection = Math.sign(event.deltaY);

      if (armedExitDirection !== null && wheelDirection === armedExitDirection) {
        return;
      }

      event.preventDefault();
      disarmExit();
      deltaBuffer += event.deltaY;
      tryAdvance();
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (lockTimer) {
        window.clearTimeout(lockTimer);
      }
      clearExitTimer();
    };
  }, [certificates.length]);

  const current = certificates[index];
  const src = globalCertificatePdfUrl(current.fileName);

  const slideVariants = {
    enter: (slideDirection: number) => ({
      opacity: 0,
      x: slideDirection > 0 ? 76 : -76,
      rotateY: slideDirection > 0 ? 10 : -10,
      filter: "blur(12px)",
      scale: 0.985,
    }),
    center: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (slideDirection: number) => ({
      opacity: 0,
      x: slideDirection > 0 ? -64 : 64,
      rotateY: slideDirection > 0 ? -10 : 10,
      filter: "blur(10px)",
      scale: 0.985,
    }),
  };

  return (
    <div ref={sectionRef} className="glassPanel carouselFrame panelInset certificateStage">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={current.fileName}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className={`carouselViewport certificateSplit ${index % 2 === 1 ? "reverse" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => onOpen(current)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpen(current);
            }
          }}
        >
          <div className="certificateVisual">
            <PdfPreview
              src={src}
              alt={current.title}
              className="panelInset certificatePreviewShell globalCertificatePreviewShell"
              scale={2.2}
            />
          </div>

          <div className="certificateDetails">
            <div className="globalCertMetaRow">
              <span className="sectionEyebrow">{current.issuer}</span>
              <span className="globalCertStep">
                {String(index + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
              </span>
            </div>
            <h4 className="globalCertTitle">{current.title}</h4>
            <p className="globalCertSummary">
              {current.summary ?? "Industry-recognized credential demonstrating validated technical capability and applied domain understanding."}
            </p>
            <div className="buttonRow" style={{ marginTop: "auto" }}>
              <button
                className="button primary"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen(current);
                }}
              >
                Open preview
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
