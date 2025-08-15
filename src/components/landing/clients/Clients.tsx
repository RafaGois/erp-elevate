import Image from "next/image";

export default function Clients() {
  return (
    <div className="h-[25svh] w-full bg-black text-white flex flex-col justify-center items-center">
      <h1>
        Nossos Melhores <br /> Clientes
      </h1>
      <div className="flex justify-evenly items-center gap-4">
        <div className="relative w-24 h-16 flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/anacapri_looigo.png"
            alt="logo_anacapri"
            fill
            className="object-contain grayscale"
          />
        </div>

        <div className="relative w-24 h-16 flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/thebest_by4xvj.webp"
            alt="logo_thebest"
            fill
            className="object-contain grayscale"
          />
        </div>

        <div className="relative w-16 h-12 flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/record_bhncr4.png"
            alt="logo_record"
            fill
            className="object-contain grayscale"
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
