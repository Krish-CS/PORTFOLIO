"use client";

import { useMemo, useState, type CSSProperties } from "react";

type PdfPreviewProps = {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
};

export default function PdfPreview({ src, alt, className, scale = 2.4 }: PdfPreviewProps) {
  const [failed, setFailed] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const previewSrc = useMemo(() => {
    const separator = src.includes("?") ? "&" : "?";
    const normalizedScale = Math.min(4, Math.max(1.2, scale));
    return `${src}${separator}preview=1&scale=${normalizedScale.toFixed(2)}`;
  }, [scale, src]);

  const containerStyle = useMemo(() => {
    if (!aspectRatio) {
      return undefined;
    }

    return { "--pdf-aspect": `${aspectRatio.toFixed(4)}` } as CSSProperties;
  }, [aspectRatio]);

  return (
    <div className={className} style={containerStyle} aria-label={alt}>
      <div className="pdfPreview">
        {!failed ? (
          <img
            src={previewSrc}
            alt={alt}
            loading="lazy"
            onLoad={(event) => {
              const element = event.currentTarget;
              if (element.naturalWidth > 0 && element.naturalHeight > 0) {
                setAspectRatio(element.naturalWidth / element.naturalHeight);
              }
            }}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="pdfFallback">Preview unavailable</div>
        )}
      </div>
    </div>
  );
}
