"use client";

import { useEffect, useState } from "react";

type PdfPreviewProps = {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
};

export default function PdfPreview({ src, alt, className, scale = 2 }: PdfPreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    async function renderPdf() {
      setImageUrl(null);
      setError(false);

      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error("Failed to load PDF");
        }

        const arrayBuffer = await response.arrayBuffer();
        const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
        const renderScale = scale * Math.max(window.devicePixelRatio || 1, 1);
        const documentTask = pdfjs.getDocument({ data: arrayBuffer, disableWorker: true });
        const document = await documentTask.promise;
        const page = await document.getPage(1);
        const viewport = page.getViewport({ scale: renderScale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas context unavailable");
        }

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvasContext: context, viewport }).promise;
        objectUrl = canvas.toDataURL("image/png");

        if (!cancelled) {
          setImageUrl(objectUrl);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      }
    }

    void renderPdf();

    return () => {
      cancelled = true;
      if (objectUrl) {
        objectUrl = null;
      }
    };
  }, [src]);

  if (error) {
    return (
      <div className={className} aria-label={alt}>
        <div className="pdfPreview" style={{ aspectRatio: "3 / 4", display: "grid", placeItems: "center" }}>
          <div className="smallCaption">Preview unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-label={alt}>
      <div className="pdfPreview">
        {imageUrl ? <img src={imageUrl} alt={alt} /> : <div style={{ aspectRatio: "3 / 4" }} className="smallCaption">Rendering preview...</div>}
      </div>
    </div>
  );
}
