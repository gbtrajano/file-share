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
    <main className="relative min-h-screen overflow-hidden bg-[#080506] text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,rgba(240,54,18,0.24),transparent_24%),radial-gradient(circle_at_top_right,rgba(240,54,18,0.14),transparent_24%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/10 bg-[#120806]/95 p-10 shadow-[0_40px_120px_-70px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f03612]/20 bg-[#f03612]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#f03612] sm:text-sm">
              Supply Sistemas
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Envie arquivos e receba o link seguro
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                Sistema direto e prático para upload até 1GB com geração
                instantânea de link.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#100705]/95 p-8 shadow-[0_30px_80px_-40px_rgba(240,54,18,0.4)]">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Upload rápido
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Selecione o arquivo e copie o link
            </h2>
            <p className="mt-3 text-slate-400">
              Nenhuma etapa desnecessária. Apenas escolha o arquivo, envie e
              obtenha o link seguro.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <label className="block cursor-pointer rounded-[1.75rem] border border-white/10 bg-[#130707]/90 px-4 py-4 text-sm text-slate-200 transition hover:border-[#f03612]/40">
                <span className="block text-sm font-semibold">
                  Escolher arquivo
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  Clique aqui para selecionar ou arraste o arquivo.
                </span>
                <input type="file" name="file" required className="sr-only" />
              </label>

              <button
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-[1.75rem] bg-[#f03612] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#c32f0e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar e gerar link"}
              </button>
            </form>

            {error && (
              <div className="mt-6 rounded-3xl border border-[#f03612]/20 bg-[#f03612]/10 p-4 text-sm text-[#ffe1dc]">
                ❌ {error}
              </div>
            )}

            {url && (
              <div className="mt-6 rounded-3xl border border-[#f03612]/20 bg-[#f03612]/10 p-4 text-sm text-white">
                <p className="font-semibold">✅ Link gerado</p>
                <code className="mt-3 block break-words rounded-3xl bg-[#0c0808]/95 p-3 text-sm text-slate-100">
                  {url}
                </code>
                <p className="mt-2 text-xs text-slate-400">
                  Clique duas vezes para copiar.
                </p>
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-[#110706]/85 p-8 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.55)]">
            <div className="space-y-6">
              <div className="rounded-3xl bg-[#150808]/95 p-6 text-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Link seguro
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  Pronto para compartilhar
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  O link fica disponível imediatamente e pode ser usado por quem
                  você autorizar.
                </p>
              </div>
              <div className="rounded-3xl bg-[#150808]/95 p-6 text-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Sem complicação
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  Fluxo direto
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  Um único objetivo: enviar e obter o link. Nada mais.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
