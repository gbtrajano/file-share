import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import os from "os";
import path from "path";

const STORAGE_ROOT =
  process.env.FILE_SHARE_DATA_DIR ||
  (process.env.VERCEL
    ? path.join(os.tmpdir(), "file-share")
    : path.join(process.cwd(), "data"));
const UPLOAD_DIR = path.join(STORAGE_ROOT, "uploads");
const METADATA_FILE = path.join(STORAGE_ROOT, "files.json");

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Carrega metadados
  let metadata: Record<string, { name: string }> = {};
  try {
    const data = await fs.readFile(METADATA_FILE, "utf-8");
    metadata = JSON.parse(data);
  } catch {
    return NextResponse.json(
      { error: "Arquivo não encontrado" },
      { status: 404 },
    );
  }

  const fileMeta = metadata[id];
  if (!fileMeta) {
    return NextResponse.json(
      { error: "Arquivo não encontrado" },
      { status: 404 },
    );
  }

  // Busca o arquivo real na pasta (pode ter extensão diferente)
  const files = await fs.readdir(UPLOAD_DIR);
  const actualFile = files.find((f) => f.startsWith(id));
  if (!actualFile) {
    return NextResponse.json(
      { error: "Arquivo corrompido ou removido" },
      { status: 404 },
    );
  }

  const filePath = path.join(UPLOAD_DIR, actualFile);
  const fileBuffer = await fs.readFile(filePath);

  // Headers de download
  const headers = new Headers();
  headers.set(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(fileMeta.name)}"`,
  );
  headers.set("Content-Length", fileBuffer.length.toString());

  // Content-Type básico (para produção, use a lib `mime`)
  const ext = path.extname(fileMeta.name).toLowerCase();
  const mimeMap: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".zip": "application/zip",
    ".mp4": "video/mp4",
    ".mp3": "audio/mpeg",
  };
  headers.set("Content-Type", mimeMap[ext] || "application/octet-stream");

  return new NextResponse(fileBuffer, { headers, status: 200 });
}
