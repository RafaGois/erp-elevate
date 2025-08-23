import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const cards = [1, 2, 3];
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current.querySelector(".approved-text"),
            start: "top 65%",
            markers: true,
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
    return cards.map((card, i) => (
      <div
        key={i + "-" + card}
        className={cn(
          "flex flex-col justify-center items-center border absolute w-[calc(100%-12rem)] h-[calc(100%-10rem)] card-" +
            card,
          "rounded-xl transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          "p-8",
          card == selectedCard && "z-[999]"
        )}
      >
        <div className="flex gap-x-1.5 w-full">
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
          <Star size={22} color="#eba434" fill="#eba434" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white relative z-40">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            nesciunt dolor. Corporis obcaecati"
            <Quote
              size={32}
              className="absolute -top-2 -left-4 z-10 opacity-20"
            />
          </p>
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
        <div className="py-4 flex w-full items-center gap-4">
          <Avatar>
            <AvatarImage sizes="36px" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-bold">Nome do cidadao</h1>
            <p className="text-xs">Cargo, Nome da empresa</p>
          </div>
        </div>
      </div>
    ));
  }

  useEffect(() => {
    gsap.from(".card-" + selectedCard, {
      opacity: 0,
      xPercent: 100,
    });

    cards.map((card) => {
      if (card == selectedCard) {
        gsap.to(container.current.querySelector(".bar-" + card), {
          flexGrow: 1,
        });
      } else {
        gsap.to(container.current.querySelector(".bar-" + card), {
          flexGrow: 0,
          flexShrink: 1,
        });
      }
    });
  }, [selectedCard]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCard((prev) => {
        const currentIndex = cards.indexOf(prev);
        const nextIndex = (currentIndex + 1) % cards.length;
        return cards[nextIndex];
      });
    }, 10 * 1000); // 1 minuto

    return () => clearInterval(interval);
  }, [cards]);

  return (
    <section ref={container} className="bg-black h-svh w-full flex flex-col md:flex-row p-8 md:p-16">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 approved-text">
          <Star size={18} color="#eba434" />
          <small className="text-white/60">Aprovados pelos melhores</small>
        </div>
        <h1 className="text-white text-8xl font-bold testimonials-title">Nossos Clientes</h1>
        <p className="text-white/40 testimonials-description">
          Não acredite apenas na nossa palavra. Veja o que nossos clientes têm a
          dizer sobre o nosso trabalho
        </p>
        <div className="py-4 flex gap-2 w-[100px] testimonials-buttons">
          <div
            onClick={() => setSelectedCard(1)}
            className={cn(
              "h-3 w-3 bg-white/20 rounded-full cursor-pointer bar-1"
            )}
          ></div>
          <div
            onClick={() => setSelectedCard(2)}
            className={cn(
              "h-3 w-3 bg-white/20 rounded-full cursor-pointer bar-2"
            )}
          ></div>
          <div
            onClick={() => setSelectedCard(3)}
            className={cn(
              "h-3 w-3 bg-white/20 rounded-full cursor-pointer bar-3"
            )}
          ></div>
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
