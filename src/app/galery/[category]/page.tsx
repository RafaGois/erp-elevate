"use client";

import Galery from "@/components/layout/galery/Galery";
import ImageDataProps from "@/lib/interfaces/ImageDataProps";
import Link from "next/link";
import { useParams } from "next/navigation";

const galleryImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823361/img-2_ea0mgu.jpg",
    alt: "a",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823357/img-12_qqstzy.jpg",
    alt: "a",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823356/img-11_tcjhvo.jpg",
    alt: "a",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823355/img-10_tbccuc.jpg",
    alt: "a",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823353/img-7_f5cab3.jpg",
    alt: "a",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823353/img-9_jzwyak.jpg",
    alt: "a",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823352/img-8_hej5rx.jpg",
    alt: "a",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823349/img-4_xplgls.jpg",
    alt: "a",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823346/img-1_pek9aw.jpg",
    alt: "a",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823348/img-3_iootpf.jpg",
    alt: "a",
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
