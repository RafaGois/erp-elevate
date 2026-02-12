import {
  getAllServiceSlugs,
  getServiceBySlug,
  type ServiceSection,
} from "@/lib/data/services";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Serviço não encontrado" };
  return {
    title: `${service.name} | Sistemas Elevate`,
    description: service.shortDescription,
  };
}

function SectionBlock({ section }: { section: ServiceSection }) {
  if (section.type === "paragraph") {
    return (
      <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
        {section.text}
      </p>
    );
  }
  if (section.type === "subtitle") {
    return (
      <h3 className="mt-8 text-xl font-semibold text-white md:mt-10 md:text-2xl">
        {section.text}
      </h3>
    );
  }
  if (section.type === "list") {
    return (
      <ul className="mt-4 space-y-3 md:mt-6">
        {section.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-lg text-gray-300 md:text-xl"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#bdfa3c]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
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
