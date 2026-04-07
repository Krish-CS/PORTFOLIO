"use client";

import { useMemo } from "react";

type PdfPreviewProps = {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
};

export default function PdfPreview({ src, alt, className }: PdfPreviewProps) {
  const previewSrc = useMemo(() => {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}preview=1`;
  }, [src]);

  return (
    <div className={className} aria-label={alt}>
      <div className="pdfPreview">
        <img src={previewSrc} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
