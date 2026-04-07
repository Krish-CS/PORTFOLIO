"use client";

import { useMemo, useState } from "react";

type PdfPreviewProps = {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
};

export default function PdfPreview({ src, alt, className }: PdfPreviewProps) {
  const [failed, setFailed] = useState(false);
  const previewSrc = useMemo(() => {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}preview=1`;
  }, [src]);

  return (
    <div className={className} aria-label={alt}>
      <div className="pdfPreview">
        {!failed ? (
          <img src={previewSrc} alt={alt} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <div className="pdfFallback">Preview unavailable</div>
        )}
      </div>
    </div>
  );
}
