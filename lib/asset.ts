export function assetUrl(segments: string[]) {
  return `/api/assets/${segments.map(encodeURIComponent).join("/")}`;
}

export function backgroundFrameUrl(frame: number) {
  const frameName = `ezgif-frame-${String(frame).padStart(3, "0")}.jpg`;
  return assetUrl(["backgrounds", frameName]);
}

export function profilePhotoUrl() {
  return assetUrl(["my", "PROFILE_PHOTO.png"]);
}

export function resumePdfUrl() {
  return assetUrl(["my", "RESUME.pdf"]);
}

export function certificatePdfUrl(fileName: string) {
  return assetUrl(["my", "CERTIFICATES", fileName]);
}

export function globalCertificatePdfUrl(fileName: string) {
  return assetUrl(["my", "CERTIFICATES", "GLOBAL", fileName]);
}

export function membershipPdfUrl(fileName: string) {
  return assetUrl(["my", "MEMBERSHIP", fileName]);
}
