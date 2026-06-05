"use client";

import { useEffect, useRef, type ReactNode } from "react";

type DashboardScrollAreaProps = {
  children: ReactNode;
};

export default function DashboardScrollArea({ children }: DashboardScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyWidth = body.style.width;
    const prevBodyTop = body.style.top;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "";
    body.style.width = "";
    body.style.top = "";

    const el = scrollRef.current;
    if (!el) {
      return () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
        body.style.position = prevBodyPosition;
        body.style.width = prevBodyWidth;
        body.style.top = prevBodyTop;
      };
    }

    const onWheel = (event: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return;

      const next = Math.max(0, Math.min(maxScroll, scrollTop + event.deltaY));
      if (next === scrollTop) return;

      el.scrollTop = next;
      event.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.width = prevBodyWidth;
      body.style.top = prevBodyTop;
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-dashboard-scroll
      className="dashboard-scroll-area h-0 min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
    >
      {children}
    </div>
  );
}
