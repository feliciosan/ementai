"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="flex items-center justify-center flex-col h-screen gap-4 bg-white">
          <Link href="/admin/home">
            <h1 className="text-white text-lg font-bold rounded-md bg-teal-600 px-2 py-1">
              Ementai
            </h1>
          </Link>
          <div className="max-w-md text-center flex flex-col gap-4 p-8 rounded-lg border border-neutral-200">
            <h2>Ops, algo deu errado!</h2>
            <p>Tente novamente mais tarde ou entre em contato com o suporte.</p>
            <p>
              Erro: <span className="text-red-500 italic">{error.message}</span>
            </p>
            <Button onClick={() => reset()}>Tentar novamente</Button>
          </div>
          <Link href="/admin/home">
            <Button variant="link">Ir para a página inicial</Button>
          </Link>
        </div>
      </body>
    </html>
  );
}
