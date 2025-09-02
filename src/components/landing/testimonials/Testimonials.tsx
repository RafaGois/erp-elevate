import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";


const testimonials = [
  {
    id: 0,
    name: "Jonathan Garcia",
    job: "Proprietário",
    company: "Garcia Líder",
    testimonial: "O trabalho foi acima da média, fora da curva e superou todas as expectativas e tudo o que tinha imaginado! Entragaram muito além do combiando!",
    picture: "https://res.cloudinary.com/dn454izoh/image/upload/v1756757946/Captura_de_Tela_2025-09-01_%C3%A0s_17.15.56_lsa7yb.png",
  },
  {
    id: 1,
    name: "Sandra",
    job: "Proprietária",
    company:"Divina Massa e Hotdog Haus",
    testimonial:"Muito além do que eu podia imaginar!",
    picture: "https://res.cloudinary.com/dn454izoh/image/upload/v1756767430/logo_512x512_v1630122655_ooc95e.png",
    audio: "https://res.cloudinary.com/dn454izoh/video/upload/v1756769526/WhatsApp_Audio_2025-09-01_at_16.22.33_n2ukfp.ogg"
  },
  {
    id: 2,
    name: "Vanessa Bornhiati",
    job: "Proprietária",
    company:"Ademicon Curitibanos e Caçador",
    testimonial:"Parabéns meninos, vocês são D+, entregam tudo!!! Somos fãs de vocês e desejamos cada vez mais sucesso!!! Voem Alto!",
    picture:"https://res.cloudinary.com/dn454izoh/image/upload/v1756767493/channels4_profile_fgzly6.jpg"
  },
]


export default function Testimonials() {
  const [selectedCard, setSelectedCard] = useState(testimonials[0].id);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current.querySelector(".approved-text"),
            start: "top 65%",
          }
        })
        .from(container.current.querySelector(".approved-text"), {
          opacity: 0,
          y: 40,
          duration: 1,
          
        }, "<").from(container.current.querySelector(".testimonials-title"), {
          opacity: 0,
          y: 40,
          duration: 1,
        }, "<")
        .from(container.current.querySelector(".testimonials-description"), {
          opacity: 0,
          y: -40,
          duration: 1,
        }, "<").from(container.current.querySelector(".testimonials-buttons"), {
          opacity: 0,
          y: -40,
          duration: 1,
        }).from(container.current.querySelector(".box-1"), {
          opacity: 0,
          x: 40,
          duration: 1,
        }).from(container.current.querySelector(".box-2"), {
          opacity: 0,
          x: -40,
          duration: 1,
        });
    },
    { scope: container }
  );

  function renderCards() {
    return testimonials.map((t, i) => (
      <div
      id="clients"
        key={i + "-" + t.name}
        className={cn(
          "flex flex-col justify-center items-center border absolute w-full sm:w-[calc(100%-12rem)] h-full sm:h-[calc(100%-10rem)] card-" +
            i,
          "rounded-xl transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          "p-8",
          i == selectedCard && "z-[999]"
        )}
      >
        <div className="flex gap-x-1.5 w-full">
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
        </div>
        <div className="flex-1 flex flex-col  justify-center">
          <p className="text-white relative z-40">
            &ldquo;{t.testimonial}&rdquo;
            <Quote
              size={32}
              className="absolute -top-2 -left-4 z-10 opacity-20"
            />
          </p>
          {t?.audio ? (
            <AudioPlayer onAudioStateChange={setIsAudioPlaying} url={t.audio}/>
          ) : ""}
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
        <div className="py-4 flex w-full items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={t.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-bold text-white">{t.name}</h1>
            <p className="text-xs text-white/50">{t.job}, {t.company}</p>
          </div>
        </div>
      </div>
    ));
  }

  function renderCardsOptions() {
    return testimonials.map((t) => {
      return (
        <div
            key={t.id}
            onClick={() => setSelectedCard(t.id)}
            className={cn(
              "h-3 w-3 bg-white/20 rounded-full cursor-pointer bar-" + t.id
            )}
          ></div>
      )
    })
  }

  useEffect(() => {

    if(!container?.current) return;

    gsap.from(".card-" + selectedCard, {
      opacity: 0,
      xPercent: 100,
    });

    testimonials.map((card) => {
      if (card.id == selectedCard) {
        gsap.to(container?.current?.querySelector(".bar-" + card.id), {
          flexGrow: 1,
        });
      } else {
        gsap.to(container.current.querySelector(".bar-" + card.id), {
          flexGrow: 0,
          flexShrink: 1,
        });
      }
    });
  }, [selectedCard]);

  useEffect(() => {
    // Só executa a rotação automática se nenhum áudio estiver tocando
    if (isAudioPlaying) return;

    const interval = setInterval(() => {
      setSelectedCard((prev) => {
        const currentIndex = testimonials.find((t) => t.id == prev).id;
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return testimonials[nextIndex].id;
      });
    }, 10 * 1000); // 10 segundos

    return () => clearInterval(interval);
  }, [testimonials, isAudioPlaying]);

  return (
    <section ref={container} className="bg-black h-svh w-full flex flex-col md:flex-row p-8 md:p-16">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 approved-text">
          <Star size={18} color="#eba434" fill="#eba434"/>
          <small className="text-white/60">Aprovados pelos melhores</small>
        </div>
        <h1 className="text-white text-7xl sm:text-8xl font-bold testimonials-title">Nossos Clientes</h1>
        <p className="text-white/40 testimonials-description">
          Não acredite apenas na nossa palavra. Veja o que nossos clientes têm a
          dizer sobre o nosso trabalho
        </p>
        <div className="py-4 flex gap-2 w-[100px] testimonials-buttons">
          {renderCardsOptions()}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center relative">
        {renderCards()}
        <div className="h-24 w-24 bg-white/5 top-12 right-14 absolute rounded-2xl box-1"></div>
        <div className="h-24 w-24 bg-white/5 bottom-12 left-14 absolute rounded-2xl box-2"></div>
      </div>
    </section>
  );
}
