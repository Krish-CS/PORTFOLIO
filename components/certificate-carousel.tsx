"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState } from "react";
import PdfPreview from "./pdf-preview";
import type { CertificateItem } from "../lib/content";
import { globalCertificatePdfUrl } from "../lib/asset";

type CertificateCarouselProps = {
  certificates: CertificateItem[];
  onOpen: (certificate: CertificateItem) => void;
};

export default function CertificateCarousel({ certificates, onOpen }: CertificateCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = certificates[index];
  const src = globalCertificatePdfUrl(current.fileName);

  const next = () => setIndex((value) => (value + 1) % certificates.length);
  const previous = () => setIndex((value) => (value - 1 + certificates.length) % certificates.length);

  return (
    <div className="glassPanel carouselFrame panelInset certificateStage">
      <div className="projectHeader">
        <h3 className="cardTitle">Global certificates</h3>
        <div className="carouselIndex">
          {String(index + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.fileName}
          initial={{ opacity: 0, x: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 24, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="carouselViewport"
        >
          <PdfPreview src={src} alt={current.title} className="panelInset certificatePreviewShell" scale={2.6} />
          <div className="panelInset certificateMeta" style={{ paddingTop: 0 }}>
            <h4 className="cardTitle" style={{ fontSize: "clamp(1.7rem, 2.2vw, 2.3rem)" }}>
              {current.title}
            </h4>
            <div className="buttonRow" style={{ marginTop: 14 }}>
              <button className="button primary" type="button" onClick={() => onOpen(current)}>
                <Maximize2 size={16} />
                Open
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="carouselControls">
        <button className="buttonAlt navButton" type="button" onClick={previous} aria-label="Previous certificate">
          <ChevronLeft size={16} />
          Previous
        </button>
        <button className="buttonAlt navButton" type="button" onClick={next} aria-label="Next certificate">
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
