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
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white">
          <Expand />
          </div>
        </div>
      </div>
    );
  };
  
  export default ImageCard;