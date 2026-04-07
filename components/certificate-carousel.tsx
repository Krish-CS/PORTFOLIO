"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState } from "react";
import PdfPreview from "./pdf-preview";
import type { CertificateItem } from "../lib/content";
import { certificatePdfUrl } from "../lib/asset";

type CertificateCarouselProps = {
  certificates: CertificateItem[];
  onOpen: (certificate: CertificateItem) => void;
};

export default function CertificateCarousel({ certificates, onOpen }: CertificateCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = certificates[index];
  const src = certificatePdfUrl(current.fileName);

  const next = () => setIndex((value) => (value + 1) % certificates.length);
  const previous = () => setIndex((value) => (value - 1 + certificates.length) % certificates.length);

  return (
    <div className="glassPanel carouselFrame panelInset certificateStage">
      <div className="projectHeader">
        <div>
          <div className="sectionEyebrow">Global Certifications</div>
          <h3 className="cardTitle">One certificate at a time.</h3>
        </div>
        <div className="carouselIndex">
          {String(index + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.fileName}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="carouselViewport"
        >
          <PdfPreview src={src} alt={current.title} className="panelInset certificatePreviewShell" scale={2.6} />
          <div className="panelInset" style={{ paddingTop: 0 }}>
            <div className="sequenceBadge">{current.issuer}</div>
            <h4 className="cardTitle" style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.5rem)" }}>
              {current.title}
            </h4>
            {current.summary ? <p className="sectionLead" style={{ marginTop: 10 }}>{current.summary}</p> : null}
            <div className="buttonRow" style={{ marginTop: 18 }}>
              <button className="button primary" type="button" onClick={() => onOpen(current)}>
                <Maximize2 size={16} />
                Open preview
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
