import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <p className="max-w-md text-muted-foreground">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <Link href="/" className="text-sm font-medium underline underline-offset-4">
        Voltar para a home
      </Link>
    </div>
  );
}
