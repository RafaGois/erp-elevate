"use client";

import { useEffect, useRef } from "react";
import "./landing-cursor.css";

const INTERACTIVE_SELECTOR = [
  'a[href]:not([aria-disabled="true"])',
  "button:not(:disabled)",
  'input:not(:disabled):not([type="hidden"])',
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "summary",
  'label[for]:not([aria-disabled="true"])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="link"]:not([aria-disabled="true"])',
  '[role="menuitem"]:not([aria-disabled="true"])',
].join(", ");

function isOverInteractive(target: Element | null): boolean {
  if (!target) return false;

  const match = target.closest(INTERACTIVE_SELECTOR);
  if (match instanceof HTMLAnchorElement) {
    return Boolean(match.getAttribute("href"));
  }
  if (match) return true;

  let node: Element | null = target;
  for (let depth = 0; depth < 6 && node; depth += 1) {
    if (!(node instanceof HTMLElement)) break;
    if (node.dataset.cursorHover === "true") return true;
    const { cursor, pointerEvents } = window.getComputedStyle(node);
    if (
      pointerEvents !== "none" &&
      cursor === "pointer" &&
      node.tagName !== "BODY" &&
      node.tagName !== "HTML"
    ) {
      return true;
    }
    node = node.parentElement;
  }

  return false;
}

function hasLeftViewport(e: MouseEvent) {
  const related = e.relatedTarget;
  return !related || !(related instanceof Node) || !document.documentElement.contains(related);
}

export default function LandingCustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const enabledRef = useRef(false);
  const overInteractiveRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopMq = window.matchMedia("(min-width: 640px)");
    if (reduced || !desktopMq.matches) return;

    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    enabledRef.current = true;

    const show = () => root.classList.add("is-visible");
    const hide = () => root.classList.remove("is-visible");

    const cancelScheduled = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const setOverInteractive = (over: boolean) => {
      if (overInteractiveRef.current === over) return;
      overInteractiveRef.current = over;
      root.classList.toggle("is-over-interactive", over);
    };

    const moveTrack = (x: number, y: number) => {
      track.style.transform = `translate3d(${x}px,${y}px,0)`;
    };

    const detectInteractive = () => {
      const { x, y } = posRef.current;
      const hit = document.elementFromPoint(x, y);
      setOverInteractive(isOverInteractive(hit));
    };

    const scheduleDetect = () => {
      if (!enabledRef.current || rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!enabledRef.current) return;
        detectInteractive();
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      show();
      moveTrack(e.clientX, e.clientY);
      scheduleDetect();
    };

    const onPointerDown = () => root.classList.add("is-pressed");
    const onPointerUp = () => root.classList.remove("is-pressed");

    const onHide = () => {
      hide();
      setOverInteractive(false);
      cancelScheduled();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (hasLeftViewport(e)) onHide();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("blur", onHide);

    const onVisible = () => {
      if (document.hidden) onHide();
    };
    document.addEventListener("visibilitychange", onVisible);

    const onBreakpoint = (e: MediaQueryListEvent) => {
      enabledRef.current = e.matches;
      if (!e.matches) onHide();
    };
    desktopMq.addEventListener("change", onBreakpoint);

    return () => {
      enabledRef.current = false;
      onHide();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("blur", onHide);
      document.removeEventListener("visibilitychange", onVisible);
      desktopMq.removeEventListener("change", onBreakpoint);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="landing-cursor hidden sm:block"
      aria-hidden
    >
      <div ref={trackRef} className="landing-cursor__track">
        <span className="landing-cursor__ring" />
        <span className="landing-cursor__dot" />
      </div>
    </div>
  );
}
