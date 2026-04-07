declare module "*.css";

declare module "pdfjs-dist/build/pdf.mjs" {
  const pdfjs: any;
  export default pdfjs;
  export const getDocument: any;
}