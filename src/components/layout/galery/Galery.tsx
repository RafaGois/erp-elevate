"use client";

import ImageCard from "./image/ImageCard";
import { useState } from "react";
import ImageModal from "./image/ImageModal";
import ImageDataProps from "@/lib/interfaces/ImageDataProps";
import Image from "next/image";

export default function Galery(props: { images: ImageDataProps[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function openModal(index: number) {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function goToPrevious() {
    setCurrentImageIndex((prev) =>
      prev === 0 ? props.images.length - 1 : prev - 1
    );
  }

  function goToNext() {
    setCurrentImageIndex((prev) =>
      prev === props.images.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <div className="w-full h-full flex flex-col flex-1">
      {props?.images?.length ? (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {props?.images?.map((image, index) => (
              <div key={image.id} className="break-inside-avoid">
                <ImageCard
                  src={image.src}
                  alt={image.alt}
                  onClick={() => openModal(index)}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center flex-col">
          <Image
            className=""
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755007271/IMG_0854_zii4ia.png"
            height={100}
            width={100}
            alt="logo-elevate"
          />
          <small className="text-white">Nothing here yet :(</small>
        </div>
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={props.images}
        currentImageIndex={currentImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}
