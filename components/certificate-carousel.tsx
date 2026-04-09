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
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
      setIndex((value) => (value + direction + certificates.length) % certificates.length);

      window.setTimeout(() => {
        locked = false;
      }, 420);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [certificates.length]);

  const current = certificates[index];
  const src = globalCertificatePdfUrl(current.fileName);

  return (
    <div ref={sectionRef} className="glassPanel carouselFrame panelInset certificateStage">
      <div className="projectHeader">
        <h3 className="cardTitle">Global certificates</h3>
        <div className="carouselIndex">{String(index + 1).padStart(2, "0")}</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.fileName}
          initial={{ opacity: 0, x: 56, rotateY: -18, rotateX: 3, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -38, rotateY: 18, rotateX: -3, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="carouselViewport"
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
          <PdfPreview
            src={src}
            alt={current.title}
            className="panelInset certificatePreviewShell globalCertificatePreviewShell"
            scale={2.3}
          />
          <div className="panelInset certificateMeta" style={{ paddingTop: 0 }}>
            <h4 className="cardTitle" style={{ fontSize: "clamp(1.7rem, 2.2vw, 2.3rem)" }}>
              {current.title}
            </h4>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
