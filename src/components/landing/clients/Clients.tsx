import Image from "next/image";

export default function Clients() {
  return (
    <div className=" w-full bg-black text-white flex flex-col justify-center items-center">
      <div className="flex justify-evenly items-center gap-4">
        <div className="relative w-24 h-16 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/anacapri_looigo.png"
            alt="logo_anacapri"
            fill
            className="object-contain grayscale"
          />
        </div>

        <div className="relative w-36 h-18 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/thebest_by4xvj.webp"
            alt="logo_thebest"
            fill
            className="object-contain grayscale"
          />
        </div>
        <div className="relative w-28 h-24 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755375444/logoberto_yjra27.avif"
            alt="logo_record"
            fill
            className="object-contain grayscale"
          />
          
        </div>
        <div className="relative w-14 h-16 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/record_bhncr4.png"
            alt="logo_record"
            fill
            className="object-contain grayscale"
          />
          
        </div>
      </div>
    </div>
  );
}
