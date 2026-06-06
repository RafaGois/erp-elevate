import { getAllServiceSlugs, getServiceBySlug } from "@/lib/data/services";
import {
  getAllServiceLandingSlugs,
  getServiceLandingBySlug,
} from "@/lib/data/service-landings";
import ServiceLandingPage from "./_components/ServiceLandingPage";
import { LegacyServicePage } from "./_components/LegacyServicePage";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = new Set([
    ...getAllServiceSlugs(),
    ...getAllServiceLandingSlugs(),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const landing = getServiceLandingBySlug(slug);
  if (landing) {
    return {
      title: landing.meta.title,
      description: landing.meta.description,
    };
  }
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Serviço não encontrado" };
  return {
    title: `${service.name} | Sistemas Elevate`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const landing = getServiceLandingBySlug(slug);

  if (landing) {
    return <ServiceLandingPage data={landing} />;
  }

  if (!getServiceBySlug(slug)) {
    notFound();
  }

  return <LegacyServicePage slug={slug} />;
}
