"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");
const METADATA_FILE = path.join(process.cwd(), "data", "files.json");

// Garante que as pastas existam
async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export async function uploadFile(formData: FormData) {
  await ensureDir();

  const file = formData.get("file") as File | null;
  if (!file) return { error: "Nenhum arquivo selecionado." };
  if (file.size > 50 * 1024 * 1024) return { error: "Arquivo maior que 50MB." };

  // Gera ID único nativo (sem dependências externas)
  const id = crypto.randomUUID();
  const ext = path.extname(file.name) || ".bin";
  const fileName = `${id}${ext}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  // Salva o arquivo
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  // Atualiza metadados (JSON simples para MVP)
  let metadata: Record<
    string,
    { name: string; size: number; createdAt: string }
  > = {};
  try {
    const data = await fs.readFile(METADATA_FILE, "utf-8");
    metadata = JSON.parse(data);
  } catch {
    // Arquivo não existe ainda
  }

  metadata[id] = {
    name: file.name,
    size: file.size,
    createdAt: new Date().toISOString(),
  };

  await fs.writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2));
  revalidatePath("/");

  return { success: true, id };
}
