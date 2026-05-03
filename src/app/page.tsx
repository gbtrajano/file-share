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

    try {
      const formData = new FormData(e.currentTarget);
      const result = await uploadFile(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setUrl(`${window.location.origin}/download/${result.id}`);
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao enviar o arquivo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 px-8 py-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -left-16 top-24 h-36 w-36 rounded-full bg-orange-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-400/90">
                Supply Sistemas
              </p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                Plataforma de compartilhamento
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300 sm:text-lg">
                Envie arquivos com link seguro e baixe em qualquer lugar. Design
                moderno com a identidade SupplySistemas.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                Status do sistema
              </p>
              <span className="mt-3 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                Online
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-slate-900/95 p-8 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
            <div className="mb-8 flex items-center justify-between rounded-3xl bg-slate-800/90 px-5 py-4 text-slate-200 shadow-inner shadow-black/20">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Upload rápido
                </p>
                <p className="mt-1 text-lg font-semibold">
                  Envie qualquer arquivo
                </p>
              </div>
              <div className="rounded-3xl bg-red-500/10 px-4 py-2 text-sm text-red-300">
                Até 1GB
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Selecione um arquivo
                </label>
                <input
                  type="file"
                  name="file"
                  required
                  className="block w-full cursor-pointer rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 file:mr-4 file:rounded-full file:border-0 file:bg-red-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-400"
                />
              </div>

              <button
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-red-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar e gerar link"}
              </button>
            </form>

            {error && (
              <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
                ❌ {error}
              </div>
            )}

            {url && (
              <div className="mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-semibold">✅ Link gerado com sucesso!</p>
                <code className="mt-2 block break-words rounded-3xl bg-slate-950/90 p-3 text-sm text-slate-100">
                  {url}
                </code>
                <p className="mt-2 text-xs text-slate-400">
                  Clique duas vezes para selecionar e copiar.
                </p>
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 p-8 text-white shadow-[0_25px_60px_-30px_rgba(248,113,113,0.7)]">
            <div className="space-y-5">
              <div className="rounded-3xl bg-white/10 p-5 shadow-inner shadow-black/20">
                <p className="text-sm uppercase tracking-[0.28em] text-red-100/80">
                  Sobre o sistema
                </p>
                <p className="mt-3 text-lg font-semibold">
                  Upload + Link de download em segundos
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 shadow-inner shadow-black/20">
                <p className="text-sm text-slate-100/80">
                  Design inspirado na identidade SupplySistemas.
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>• Interface moderna e responsiva</li>
                  <li>• Upload direto com link exclusivo</li>
                  <li>• Compatível com Vercel</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 shadow-inner shadow-black/20">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/80">
                  Marca
                </p>
                <p className="mt-3 text-2xl font-bold">SupplySistemas</p>
              </div>
            </div>
          </aside>
        </section>

        <div className="text-center text-xs uppercase tracking-[0.28em] text-slate-500">
          Feito por SupplySistemas
        </div>
      </div>
    </main>
  );
}
