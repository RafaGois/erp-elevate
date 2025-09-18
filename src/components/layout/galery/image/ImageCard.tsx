import { Expand } from "lucide-react";
import Image from "next/image";

interface ImageCardProps {
    src: string;
    alt: string;
    onClick: () => void;
    className?: string;
  }
  
  const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick, className = '' }) => {
    return (
      <div
        className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${className}`}
        onClick={onClick}
      >
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 ease-out transform-gpu will-change-transform group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-white/20 rounded-full p-3 text-white pointer-events-none">
          <Expand />
          </div>
        </div>
      </div>
    );
  };
  
  export default ImageCard;