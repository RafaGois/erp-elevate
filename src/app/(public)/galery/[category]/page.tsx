"use client";

import Galery from "@/components/layout/galery/Galery";
import ImageDataProps from "@/lib/interfaces/ImageDataProps";
import Link from "next/link";
import { useParams } from "next/navigation";

const galleryImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823361/img-2_ea0mgu.jpg",
    alt: "Modern architecture building with geometric patterns",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823357/img-12_qqstzy.jpg",
    alt: "Portrait of woman with natural lighting",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823356/img-11_tcjhvo.jpg",
    alt: "Landscape mountain view during sunset",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823355/img-10_tbccuc.jpg",
    alt: "Close-up of colorful flowers in bloom",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823353/img-7_f5cab3.jpg",
    alt: "Urban street photography with neon lights",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823353/img-9_jzwyak.jpg",
    alt: "Abstract art with vibrant colors",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823352/img-8_hej5rx.jpg",
    alt: "Peaceful lake reflection at dawn",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823349/img-4_xplgls.jpg",
    alt: "Minimalist interior design concept",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823346/img-1_pek9aw.jpg",
    alt: "Desert landscape with dramatic sky",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823348/img-3_iootpf.jpg",
    alt: "Vintage coffee shop atmosphere",
  },
  
];

export default function GaleryPage() {
  const params = useParams<{ category: string }>();

  function imagesFilteredByService() {
    switch (params.category) {
      case "institutional":
        return galleryImages;
        
      case "sport":
        break;
      case "food":
        break;
      case "wedding":
        break;
      case "event":
        break;
      case "inauguration":
        break;
      case "programming":
        break;
      default:
        return [];
    }
  }

  return (
    <div className="bg-black min-h-svh w-full flex flex-col">
      <div className="p-8 w-full flex justify-between">
        <Link href="/#services">
          <p className="text-white underline">VOLTAR</p>
        </Link>
        <h1 className="text-white">GALERIA</h1>
        <div></div>
      </div>
      <Galery images={imagesFilteredByService()} />
    </div>
  );
}
