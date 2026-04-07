"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../lib/content";
import { assetUrl } from "../lib/asset";

type ProjectCarouselProps = {
  projects: Project[];
};

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [missingPhotos, setMissingPhotos] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const current = projects[index];

  useEffect(() => {
    let deltaBuffer = 0;
    let locked = false;

    const onWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const isActive = rect.top < vh * 0.72 && rect.bottom > vh * 0.28;
      if (!isActive) return;

      deltaBuffer += event.deltaY;
      if (locked || Math.abs(deltaBuffer) < 120) return;

      const direction = deltaBuffer > 0 ? 1 : -1;
      deltaBuffer = 0;
      locked = true;
      setIndex((value) => (value + direction + projects.length) % projects.length);

      window.setTimeout(() => {
        locked = false;
      }, 420);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [projects.length]);

  return (
    <div ref={sectionRef} className="glassPanel carouselFrame panelInset">
      <div className="projectHeader">
        <div>
          <h3 className="cardTitle">Projects</h3>
        </div>
        <div className="carouselIndex">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </div>
      </div>

      <div className="carouselViewport">
        <AnimatePresence mode="wait">
          <motion.article
            key={current.title}
            initial={{ opacity: 0, x: 36, y: 12, rotateY: -18, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -32, y: -10, rotateY: 18, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="projectCard glassPanel"
            style={{ minHeight: 360 }}
          >
            <div className="cardHeader">
              <div>
                <h4 className="cardTitle" style={{ maxWidth: "12ch" }}>
                  {current.title}
                </h4>
              </div>
              <div className="cardMeta" style={{ textAlign: "right", maxWidth: 260 }}>
                {current.description}
              </div>
            </div>

            <div className="projectPhotoFrame">
              {current.photoName && !missingPhotos[current.title] ? (
                <img
                  src={assetUrl(["project-photos", current.photoName])}
                  alt={current.title}
                  className="projectPhoto"
                  loading="lazy"
                  onError={() => {
                    setMissingPhotos((value) => ({ ...value, [current.title]: true }));
                  }}
                />
              ) : (
                <div className="projectPhotoPlaceholder" aria-hidden="true" />
              )}
            </div>

            <div className="tagRow" style={{ marginBottom: 20 }}>
              {current.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="cardActions">
              {current.href ? (
                <a className="button primary" href={current.href} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} />
                  View project
                </a>
              ) : null}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
