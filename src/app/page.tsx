"use client";

import { useState } from "react";
import { uploadFile } from "./actions";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUrl(null);

    const formData = new FormData(e.currentTarget);
    const result = await uploadFile(formData);

    if (result.error) setError(result.error);
    else setUrl(`${window.location.origin}/download/${result.id}`);

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-gray-900">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          📁 Compartilhador de Arquivos
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Selecione um arquivo:
          </label>
          <input
            type="file"
            name="file"
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar e Gerar Link"}
          </button>
        </form>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            ❌ {error}
          </div>
        )}

        {url && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-800 mb-2">
              ✅ Link gerado com sucesso!
            </p>
            <code className="block bg-white p-3 rounded border border-green-200 break-all text-sm text-gray-800 select-all">
              {url}
            </code>
            <p className="mt-2 text-xs text-gray-500">
              Clique duas vezes para selecionar e copiar.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
