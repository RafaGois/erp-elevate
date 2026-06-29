"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface Props {
  value: number;
  duration?: number;
  delay?: number;
  format?: (v: number) => string;
  className?: string;
}

/** Anima de 0 até `value` ao montar — usado nos números grandes de cada slide. */
export default function CountUp({ value, duration = 1.6, delay = 0.2, format, className }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [value, duration, delay]);

  return (
    <span className={className}>
      {format ? format(display) : Math.round(display).toLocaleString("pt-BR")}
    </span>
  );
}
