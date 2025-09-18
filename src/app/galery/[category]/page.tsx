"use client";

import Galery from "@/components/layout/galery/Galery";
import ImageDataProps from "@/lib/interfaces/ImageDataProps";
import Link from "next/link";
import { useParams } from "next/navigation";

const corporativeImages: ImageDataProps[] = [

  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823357/img-12_qqstzy.jpg",
    alt: "a",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823361/img-2_ea0mgu.jpg",
    alt: "a",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823356/img-11_tcjhvo.jpg",
    alt: "a",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823355/img-10_tbccuc.jpg",
    alt: "a",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823353/img-9_jzwyak.jpg",
    alt: "a",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823353/img-7_f5cab3.jpg",
    alt: "a",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823352/img-8_hej5rx.jpg",
    alt: "a",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823348/img-3_iootpf.jpg",
    alt: "a",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009525/img-1_xvdxxv.jpg",
    alt: "a",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009529/img-2_tsdglm.jpg",
    alt: "a",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009533/img-3_z1g7yn.jpg",
    alt: "a",
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009538/img-4_lcbvnz.jpg",
    alt: "a",
  },
  
];

const foodImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825722/img-12_sbsr0x.jpg",
    alt: "a",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825721/img-11_z7zx6p.jpg",
    alt: "a",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825720/img-10_znymiu.jpg",
    alt: "a",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825720/img-9_etwlpt.jpg",
    alt: "a",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825716/img-3_w8fboa.jpg",
    alt: "a",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825717/img-4_beazxy.jpg",
    alt: "a",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825716/img-5_kalxyz.jpg",
    alt: "a",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825715/img-2_jx22rn.jpg",
    alt: "a",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756825714/img-1_ty56ns.jpg",
    alt: "a",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1755977544/DIVINA-4_xj4avw.jpg",
    alt: "a",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758203002/site-9_f0blme.jpg",
    alt: "a",
  },
];

const institutionalImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009548/img-6_r8dif4.jpg",
    alt: "a",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009542/img-5_ybuv6b.jpg",
    alt: "a",
  },
  
  {
    id: 3,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823350/img-6_pvqbqz.jpg",
    alt: "a",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1756823349/img-5_svixxi.jpg",
    alt: "a",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009542/img-5_ybuv6b.jpg",
    alt: "a",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009552/img-7_b502t8.jpg",
    alt: "a",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009557/img-8_c8knql.jpg",
    alt: "a",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009563/img-9_cvxq8f.jpg",
    alt: "a",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1757009566/img-10_p3zhi5.jpg",
    alt: "a",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758203203/site-2_zz3ohw.jpg",
    alt: "a",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758203205/site-3_hbtlto.jpg",
    alt: "a",
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758203207/site-10_fobfic.jpg",
    alt: "a",
  },
  {
    id: 16,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758203209/site-11_jjof5b.jpg",
    alt: "a",
  },
];

const sportsImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758202823/site-8_avue00.jpg",
    alt: "a",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758202821/site-7_sgcifo.jpg",
    alt: "a",
  },
  
  {
    id: 3,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758202819/site-4_yy3mco.jpg",
    alt: "a",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758202819/site-6_jw8rod.jpg",
    alt: "a",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758202817/site-5_ltxd3j.jpg",
    alt: "a",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758203136/site-1_nypc5i.jpg",
    alt: "a",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206875/esporte-28_rguscs.jpg",
    alt: "a",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206877/esporte-29_edakft.jpg",
    alt: "a",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206881/esporte-30_pfhgme.jpg",
    alt: "a",
  },
];


const weddingImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206271/site-1_noco9x.jpg",
    alt: "a",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206272/site-2_pwkf2y.jpg",
    alt: "a",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206273/site-4_vlmhpr.jpg",
    alt: "a",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206275/site-5_itp9ci.jpg",
    alt: "a",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206278/site-6_q6ps43.jpg",
    alt: "a",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206280/site-7_e4o6g8.jpg",
    alt: "a",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206282/site-8_giwlci.jpg",
    alt: "a",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206285/site-9_r6dgch.jpg",
    alt: "a",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206287/site-10_gzn53k.jpg",
    alt: "a",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206291/site-11_gvamkv.jpg",
    alt: "a",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206370/site-12_eifaax.jpg",
    alt: "a",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206372/site-13_zjhoze.jpg",
    alt: "a",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206373/site-14_p7awvj.jpg",
    alt: "a",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758206696/site-3_npcltl.jpg",
    alt: "a",
  },
 
]

const eventsImages: ImageDataProps[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1755977622/GF12-04_-44_ovnkt3.jpg",
    alt: "a",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758207601/eventos-29_bttnpt.jpg",
    alt: "a",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758207604/eventos-30_e7cwyp.jpg",
    alt: "a",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn454izoh/image/upload/v1758207606/eventos-31_zwlffx.jpg",
    alt: "a",
  },
]


export default function GaleryPage() {
  const params = useParams<{ category: string }>();

  function imagesFilteredByService() {
    switch (params.category) {
      case "institucional":
        return institutionalImages;
      case "esporte":
        return sportsImages;
      case "gastronomia":
       return foodImages;
      case "casamentos":
        return weddingImages;
      case "eventos":
        return eventsImages;
      case "corporativos":
        return corporativeImages;
      case "programacao":
        break;
    }
  }

  return (
    <div className="bg-black min-h-svh w-full flex flex-col">
      <div className="p-8 w-full flex justify-between">
        <Link href="/#services">
          <p className="text-white underline">VOLTAR</p>
        </Link>
        <h1 className="text-white uppercase">{params.category}</h1>
        <div></div>
      </div>
      <Galery images={imagesFilteredByService()} />
    </div>
  );
}
