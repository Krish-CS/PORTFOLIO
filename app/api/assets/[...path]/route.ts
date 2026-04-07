import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const VALID_ROOTS = new Map([
  ["backgrounds", path.join(ROOT, "BACKGROUNDS")],
  ["my", path.join(ROOT, "MY")],
]);

function getContentType(fileName: string) {
  const lower = fileName.toLowerCase();

  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  if (!segments.length) {
    return new Response("Not found", { status: 404 });
  }

  const [rootKey, ...rest] = segments.map((segment) => segment.toLowerCase());
  const basePath = VALID_ROOTS.get(rootKey);

  if (!basePath || rest.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const actualSegments = segments.slice(1);
  const filePath = path.join(basePath, ...actualSegments);
  const normalizedBase = path.normalize(basePath + path.sep);
  const normalizedFile = path.normalize(filePath);

  if (!normalizedFile.startsWith(normalizedBase)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(normalizedFile);
    return new Response(data, {
      headers: {
        "Content-Type": getContentType(normalizedFile),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
