"use client";

import Galery from "@/components/layout/galery/Galery";
import ImageDataProps from "@/lib/interfaces/ImageDataProps";
import Link from "next/link";
import { useParams } from "next/navigation";

const galleryImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png",
    alt: "Modern architecture building with geometric patterns",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1754873016/floripa-1_elhte2.jpg",
    alt: "Portrait of woman with natural lighting",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png",
    alt: "Landscape mountain view during sunset",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=500",
    alt: "Close-up of colorful flowers in bloom",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Urban street photography with neon lights",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Abstract art with vibrant colors",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Peaceful lake reflection at dawn",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Minimalist interior design concept",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Desert landscape with dramatic sky",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1754873016/floripa-1_elhte2.jpg",
    alt: "Vintage coffee shop atmosphere",
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg?auto=compress&cs=tinysrgb&w=500",
    alt: "Ocean waves crashing on rocky shore",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1754873016/floripa-1_elhte2.jpg",
    alt: "Forest pathway through tall trees",
  },
];

export default function GaleryPage() {
  const params = useParams<{ category: string }>();

  function imagesFilteredByService() {
    switch (params.category) {
      case "institutional":
        return galleryImages;
        break;
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
