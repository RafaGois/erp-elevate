import { getServiceBySlug } from "@/lib/data/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SectionBlock } from "./SectionBlock";

export function LegacyServicePage({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <Link
          href="/#services"
          className="mb-10 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-[#bdfa3c] md:mb-14"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar aos serviços</span>
        </Link>

        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {service.name}
          </h1>
          <p className="mt-4 text-lg text-gray-400 md:text-xl">
            {service.shortDescription}
          </p>
        </header>

        <article className="space-y-8 md:space-y-10">
          {service.sections.map((section, index) => (
            <SectionBlock key={index} section={section} />
          ))}
        </article>

        <footer className="mt-16 border-t border-white/10 pt-10 md:mt-20 md:pt-14">
          <p className="text-gray-500">
            Quer saber como podemos ajudar sua operação?
          </p>
          <Link
            href="/#services"
            className="mt-4 inline-block font-medium text-[#bdfa3c] transition-opacity hover:opacity-90"
          >
            Conheça todos os nossos serviços →
          </Link>
        </footer>
      </div>
    </div>
  );
}
