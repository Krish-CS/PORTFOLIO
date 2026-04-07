"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import PdfPreview from "./pdf-preview";

export type PdfLightboxProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  src: string;
  onClose: () => void;
};

export default function PdfLightbox({ open, title, subtitle, src, onClose }: PdfLightboxProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="modalBackdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glassPanel modalFrame"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="button modalClose" type="button" onClick={onClose} aria-label="Close preview">
              <X size={16} />
            </button>
            <div className="panelInset" style={{ paddingBottom: 20 }}>
              <PdfPreview src={src} alt={title} className="panelInset certificatePreviewShell" scale={2.8} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
