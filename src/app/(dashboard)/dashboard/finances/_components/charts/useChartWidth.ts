import { useEffect, useRef, useState } from "react";

/**
 * Observa a largura do container para gráficos D3 responsivos.
 * Retorna o ref do wrapper e a largura medida em px.
 */
export function useChartWidth<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setWidth(el.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
