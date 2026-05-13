"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useCallback } from "react";
import type { CustomizacaoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

// ─── Types ────────────────────────────────────────────────────────────────────

type DeviceType = "desktop" | "mobile" | "tablet" | "laptop";

interface Theme {
  key: string;
  label: string;
  description: string;
  tag: string;
  device: DeviceType;
  deviceLabel: string;
  accentColor: string;
  windowBorder: string;
  windowShadow: string;
  chromeBg: string;
  chromeText: string;
  navBg: string;
  navText: string;
  navRadius: string;
  navBorder: string;
  heroBg: string;
  heroHeading: string;
  heroSub: string;
  btnBg: string;
  btnText: string;
  btnRadius: string;
  btnBorder: string;
  btnShadow: string;
  cardBg: string;
  cardBorder: string;
  cardRadius: string;
  cardShadow: string;
  cardIconBg: string;
  cardIconColor: string;
  cardTitle: string;
  cardBody: string;
  shapeBg: string;
  shapeRadius: string;
  shapeOpacity: string;
  shape2Bg: string;
  shape2Radius: string;
  footerBg: string;
  footerText: string;
  pageBg: string;
}

// ─── Theme definitions ────────────────────────────────────────────────────────

const THEMES: Theme[] = [
  {
    key: "corporativo",
    label: "Identidade corporativa",
    description: "Transmite autoridade e credibilidade para o seu segmento.",
    tag: "Formal · Confiança",
    device: "desktop",
    deviceLabel: "Desktop",
    accentColor: "#1E3A8A",
    windowBorder: "#1E3A8A",
    windowShadow: "#0F1F4A",
    chromeBg: "#E8ECF0",
    chromeText: "#4A5568",
    navBg: "#1E3A8A",
    navText: "#FFFFFF",
    navRadius: "0px",
    navBorder: "none",
    heroBg: "#FFFFFF",
    heroHeading: "#0F1F4A",
    heroSub: "#64748B",
    btnBg: "#1E3A8A",
    btnText: "#FFFFFF",
    btnRadius: "0px",
    btnBorder: "none",
    btnShadow: "none",
    cardBg: "#F8FAFC",
    cardBorder: "#CBD5E1",
    cardRadius: "0px",
    cardShadow: "none",
    cardIconBg: "#EFF6FF",
    cardIconColor: "#1E3A8A",
    cardTitle: "#0F1F4A",
    cardBody: "#64748B",
    shapeBg: "#DBEAFE",
    shapeRadius: "0px",
    shapeOpacity: "0.8",
    shape2Bg: "#1E3A8A",
    shape2Radius: "0px",
    footerBg: "#1E3A8A",
    footerText: "#BFDBFE",
    pageBg: "#FFFFFF",
  },
  {
    key: "criativo",
    label: "Presença criativa",
    description: "Cores e formas que traduzem a personalidade única da sua marca.",
    tag: "Vibrante · Expressivo",
    device: "mobile",
    deviceLabel: "Mobile",
    accentColor: "#7C3AED",
    windowBorder: "#7C3AED",
    windowShadow: "#5B21B6",
    chromeBg: "#EDE9FE",
    chromeText: "#5B21B6",
    navBg: "#7C3AED",
    navText: "#FFFFFF",
    navRadius: "16px",
    navBorder: "none",
    heroBg: "#F5F0FF",
    heroHeading: "#3B0764",
    heroSub: "#6D28D9",
    btnBg: "#7C3AED",
    btnText: "#FFFFFF",
    btnRadius: "9999px",
    btnBorder: "none",
    btnShadow: "0 8px 24px rgba(124,58,237,0.35)",
    cardBg: "#FFFFFF",
    cardBorder: "#DDD6FE",
    cardRadius: "20px",
    cardShadow: "0 4px 20px rgba(124,58,237,0.12)",
    cardIconBg: "#F3EFFE",
    cardIconColor: "#7C3AED",
    cardTitle: "#3B0764",
    cardBody: "#6D28D9",
    shapeBg: "#C4B5FD",
    shapeRadius: "9999px",
    shapeOpacity: "0.6",
    shape2Bg: "#A855F7",
    shape2Radius: "9999px",
    footerBg: "#7C3AED",
    footerText: "#EDE9FE",
    pageBg: "#F5F0FF",
  },
  {
    key: "luxo",
    label: "Toque de luxo",
    description: "Elegância e sofisticação para quem quer se posicionar no topo.",
    tag: "Premium · Exclusivo",
    device: "tablet",
    deviceLabel: "Tablet",
    accentColor: "#D4AF37",
    windowBorder: "#D4AF37",
    windowShadow: "#0A0A0A",
    chromeBg: "#1C1C1C",
    chromeText: "#D4AF37",
    navBg: "#0F0F0F",
    navText: "#D4AF37",
    navRadius: "8px",
    navBorder: "1px solid rgba(212,175,55,0.3)",
    heroBg: "#141414",
    heroHeading: "#F5F0E0",
    heroSub: "#A89060",
    btnBg: "transparent",
    btnText: "#D4AF37",
    btnRadius: "4px",
    btnBorder: "1px solid #D4AF37",
    btnShadow: "0 0 20px rgba(212,175,55,0.2)",
    cardBg: "#1C1C1C",
    cardBorder: "rgba(212,175,55,0.35)",
    cardRadius: "6px",
    cardShadow: "0 4px 24px rgba(0,0,0,0.6)",
    cardIconBg: "rgba(212,175,55,0.1)",
    cardIconColor: "#D4AF37",
    cardTitle: "#F5F0E0",
    cardBody: "#A89060",
    shapeBg: "#D4AF37",
    shapeRadius: "4px",
    shapeOpacity: "0.15",
    shape2Bg: "#B8860B",
    shape2Radius: "50%",
    footerBg: "#0A0A0A",
    footerText: "#D4AF37",
    pageBg: "#141414",
  },
  {
    key: "moderno",
    label: "Modernidade minimalista",
    description: "Clareza e foco: o essencial, com design que encanta.",
    tag: "Limpo · Contemporâneo",
    device: "laptop",
    deviceLabel: "Laptop",
    accentColor: "#10B981",
    windowBorder: "#10B981",
    windowShadow: "#047857",
    chromeBg: "#E8F5F0",
    chromeText: "#047857",
    navBg: "#FFFFFF",
    navText: "#047857",
    navRadius: "12px",
    navBorder: "1px solid #D1FAE5",
    heroBg: "#F8FAFC",
    heroHeading: "#064E3B",
    heroSub: "#6B7280",
    btnBg: "#10B981",
    btnText: "#FFFFFF",
    btnRadius: "9999px",
    btnBorder: "none",
    btnShadow: "0 4px 16px rgba(16,185,129,0.3)",
    cardBg: "#FFFFFF",
    cardBorder: "#D1FAE5",
    cardRadius: "12px",
    cardShadow: "0 2px 12px rgba(16,185,129,0.08)",
    cardIconBg: "#ECFDF5",
    cardIconColor: "#10B981",
    cardTitle: "#064E3B",
    cardBody: "#6B7280",
    shapeBg: "#A7F3D0",
    shapeRadius: "12px",
    shapeOpacity: "0.5",
    shape2Bg: "#10B981",
    shape2Radius: "50%",
    footerBg: "#064E3B",
    footerText: "#A7F3D0",
    pageBg: "#F8FAFC",
  },
];

// ─── Scroll config ────────────────────────────────────────────────────────────

/** Antes da 1.ª troca (0 → 1): pouco scroll — o 1.º estilo já está visível ao fixar a seção. */
const VH_LEAD_IN = 18;
const VH_PER_STEP = 90;
const TOTAL_SCROLL_VH = VH_LEAD_IN + VH_PER_STEP * (THEMES.length - 1);

// ─── Device type icon ─────────────────────────────────────────────────────────

function DeviceIcon({ device, color }: { device: DeviceType; color: string }) {
  if (device === "desktop")
    return (
      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" className="shrink-0">
        <rect x="0.6" y="0.6" width="12.8" height="8.8" rx="1" stroke={color} strokeWidth="1.2" />
        <path d="M4 10l1 2M10 10l-1 2M3 12h8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  if (device === "mobile")
    return (
      <svg width="9" height="14" viewBox="0 0 9 14" fill="none" className="shrink-0">
        <rect x="0.6" y="0.6" width="7.8" height="12.8" rx="2" stroke={color} strokeWidth="1.2" />
        <circle cx="4.5" cy="11.5" r="0.7" fill={color} />
        <path d="M3 2.5h3" stroke={color} strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  if (device === "tablet")
    return (
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
        <rect x="0.6" y="0.6" width="12.8" height="8.8" rx="2" stroke={color} strokeWidth="1.2" />
        <circle cx="12" cy="5" r="0.7" fill={color} />
      </svg>
    );
  // laptop
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className="shrink-0">
      <path d="M2 1h10a1 1 0 011 1v6H1V2a1 1 0 011-1z" stroke={color} strokeWidth="1.2" />
      <path d="M0 8h14l1 3H-1l1-3z" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

// ─── Desktop Mockup ───────────────────────────────────────────────────────────

function DesktopMockup({ t }: { t: Theme }) {
  return (
    <div
      className="w-full overflow-hidden rounded-sm border-2"
      style={{ borderColor: t.windowBorder, boxShadow: `6px 6px 0 ${t.windowShadow}` }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-2.5 py-1.5" style={{ background: t.chromeBg }}>
        <div className="flex shrink-0 gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
        </div>
        <div
          className="flex h-5 max-w-[140px] flex-1 items-center gap-1.5 rounded-t-md border border-b-0 px-2"
          style={{ background: "#fff", borderColor: `${t.windowBorder}35` }}
        >
          <div className="h-2 w-2 rounded-[2px]" style={{ background: t.accentColor, opacity: 0.7 }} />
          <span className="h-1.5 flex-1 rounded-full" style={{ background: t.chromeText, opacity: 0.4 }} />
        </div>
        <div className="flex-1" />
      </div>

      {/* URL bar */}
      <div
        className="flex items-center gap-2 px-2.5 py-1"
        style={{ background: t.chromeBg, borderTop: `1px solid ${t.windowBorder}20` }}
      >
        <div className="flex items-center gap-0.5 text-[9px]" style={{ color: `${t.chromeText}70` }}>
          <span>←</span>
          <span>→</span>
          <span>↺</span>
        </div>
        <div
          className="flex flex-1 items-center gap-1.5 rounded-full border bg-white/80 px-2.5 py-0.5"
          style={{ borderColor: `${t.windowBorder}25` }}
        >
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
            <path d="M5 9A4 4 0 105 1a4 4 0 000 8zM9 9l3 3" stroke={t.accentColor} strokeWidth="1.5" strokeLinecap="round" opacity={0.7} />
          </svg>
          <span className="font-mono text-[8px]" style={{ color: t.chromeText }}>
            seu-site.com.br
          </span>
        </div>
      </div>

      {/* Page */}
      <div style={{ background: t.pageBg }}>
        {/* Navbar */}
        <div
          className="flex items-center justify-between gap-2 px-3 py-1.5"
          style={{ background: t.navBg, borderRadius: t.navRadius, border: t.navBorder }}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-sm" style={{ background: t.navText, opacity: 0.85 }} />
            <span className="font-bold tracking-wider" style={{ color: t.navText, fontSize: "9px" }}>
              BRAND
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[20, 20, 24, 20].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{ width: `${w}px`, background: t.navText, opacity: 0.65 - i * 0.1 }}
              />
            ))}
          </div>
          <div
            className="flex h-5 items-center px-2.5 font-bold"
            style={{
              background: t.btnBg,
              color: t.btnText,
              borderRadius: t.btnRadius,
              border: t.btnBorder,
              boxShadow: t.btnShadow,
              fontSize: "8px",
            }}
          >
            Começar
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden px-4 py-3" style={{ background: t.heroBg }}>
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 blur-sm"
            style={{
              background: t.shapeBg,
              borderRadius: t.shapeRadius,
              opacity: parseFloat(t.shapeOpacity) * 0.5 + 0.1,
            }}
          />
          <div
            className="pointer-events-none absolute bottom-2 left-[45%] h-10 w-10"
            style={{ background: t.shape2Bg, borderRadius: t.shape2Radius, opacity: 0.22 }}
          />

          <div className="relative z-10 grid grid-cols-[1fr_0.85fr] items-center gap-3">
            <div className="space-y-2">
              <div className="space-y-1">
                <span className="block h-3 w-[88%] rounded-full" style={{ background: t.heroHeading, opacity: 0.95 }} />
                <span className="block h-3 w-[68%] rounded-full" style={{ background: t.heroHeading, opacity: 0.8 }} />
              </div>
              <div className="space-y-1">
                <span className="block h-1.5 w-full rounded-full" style={{ background: t.heroSub, opacity: 0.65 }} />
                <span className="block h-1.5 w-[80%] rounded-full" style={{ background: t.heroSub, opacity: 0.5 }} />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex h-6 w-18 items-center justify-center"
                  style={{
                    background: t.btnBg,
                    borderRadius: t.btnRadius,
                    border: t.btnBorder,
                    boxShadow: t.btnShadow,
                    minWidth: "72px",
                  }}
                >
                  <span className="h-1.5 w-10 rounded-full" style={{ background: t.btnText, opacity: 0.85 }} />
                </div>
                <div
                  className="flex h-6 w-14 items-center justify-center border"
                  style={{ borderColor: `${t.accentColor}50`, borderRadius: t.btnRadius }}
                >
                  <span className="h-1.5 w-7 rounded-full" style={{ background: t.accentColor, opacity: 0.7 }} />
                </div>
              </div>
              {/* Social proof */}
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-3.5 w-3.5 rounded-full border-2"
                    style={{
                      background: t.cardIconBg,
                      borderColor: t.heroBg,
                      marginLeft: i > 0 ? "-5px" : "0",
                    }}
                  />
                ))}
                <span
                  className="ml-1 h-1.5 w-8 rounded-full"
                  style={{ background: t.heroSub, opacity: 0.45 }}
                />
              </div>
            </div>

            <div
              className="relative h-24 overflow-hidden rounded-lg"
              style={{ background: t.shapeBg, borderRadius: t.shapeRadius, opacity: 0.85 }}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{ background: `linear-gradient(135deg, ${t.shape2Bg}, transparent)` }}
              />
              <div className="absolute inset-2.5 grid grid-cols-2 gap-1.5">
                <div className="rounded-md" style={{ background: "rgba(255,255,255,0.22)" }}>
                  <div className="m-1.5 space-y-1">
                    <div className="h-1.5 w-6 rounded-full bg-white/50" />
                    <div className="h-4 w-full rounded bg-white/20" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-9 rounded-md" style={{ background: "rgba(255,255,255,0.15)" }} />
                  <div className="h-4 rounded-md" style={{ background: "rgba(255,255,255,0.1)" }} />
                </div>
              </div>
              <div
                className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full"
                style={{ background: t.shape2Bg, opacity: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-1.5 px-4 py-2" style={{ background: t.heroBg }}>
          {["◈", "◎", "◉"].map((icon, i) => (
            <div
              key={i}
              className="border p-2"
              style={{
                background: t.cardBg,
                borderColor: t.cardBorder,
                borderRadius: t.cardRadius,
                boxShadow: t.cardShadow,
              }}
            >
              <div
                className="mb-1.5 flex h-5 w-5 items-center justify-center font-bold"
                style={{
                  background: t.cardIconBg,
                  color: t.cardIconColor,
                  borderRadius: t.cardRadius,
                  fontSize: "10px",
                }}
              >
                {icon}
              </div>
              <span className="block h-2 w-[72%] rounded-full" style={{ background: t.cardTitle, opacity: 0.9 }} />
              <span
                className="mt-1 block h-1.5 w-full rounded-full"
                style={{ background: t.cardBody, opacity: 0.55 }}
              />
              <span
                className="mt-0.5 block h-1.5 w-[80%] rounded-full"
                style={{ background: t.cardBody, opacity: 0.38 }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-1.5"
          style={{ background: t.footerBg }}
        >
          <span
            className="font-mono uppercase tracking-widest"
            style={{ color: t.footerText, opacity: 0.85, fontSize: "7px" }}
          >
            © 2025 BRAND
          </span>
          <div className="flex gap-1.5">
            {[1, 0.6, 0.35].map((op, i) => (
              <span key={i} className="h-1.5 w-6 rounded-full" style={{ background: t.footerText, opacity: op }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Mockup ────────────────────────────────────────────────────────────

const MOBILE_TAB_PATHS = [
  "M1 8L8 2l7 6v8h-5V11H6v5H1V8z",
  "M11 11l4 4M6 11A5 5 0 106 1a5 5 0 000 10z",
  "M8 1v14M1 8h14",
  "M8 7a3 3 0 100-6 3 3 0 000 6zM2 15c0-3.3 2.7-6 6-6s6 2.7 6 6",
];

function MobileMockup({ t }: { t: Theme }) {
  return (
    <div
      className="overflow-hidden border-[3.5px]"
      style={{
        width: "178px",
        borderRadius: "28px",
        borderColor: t.windowBorder,
        background: t.pageBg,
        boxShadow: `0 0 0 5px ${t.windowBorder}18, 5px 8px 0 ${t.windowShadow}`,
      }}
    >
      {/* Status / Dynamic Island */}
      <div className="px-3 pb-1 pt-2" style={{ background: t.navBg }}>
        <div className="mx-auto mb-1.5 flex h-[13px] w-[50px] items-center justify-center gap-1.5 rounded-full bg-black">
          <span className="h-[4px] w-[4px] rounded-full bg-neutral-700" />
          <span className="h-[6px] w-[6px] rounded-full bg-neutral-800" />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold" style={{ color: t.navText, fontSize: "7px" }}>
            9:41
          </span>
          <div className="flex items-center gap-1">
            {/* Signal bars */}
            <div className="flex items-end gap-[1.5px]">
              {[4, 6, 8, 10].map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-[0.5px]"
                  style={{ height: `${h}px`, background: t.navText, opacity: i < 3 ? 0.9 : 0.3 }}
                />
              ))}
            </div>
            {/* Battery */}
            <div className="ml-1 flex items-center">
              <div
                className="flex h-[7px] w-[12px] items-center rounded-[1.5px] border p-[1px]"
                style={{ borderColor: t.navText, opacity: 0.8 }}
              >
                <div className="h-[5px] w-[8px] rounded-[0.5px]" style={{ background: t.navText }} />
              </div>
              <div
                className="h-[3.5px] w-[1.5px] rounded-r-[0.5px]"
                style={{ background: t.navText, opacity: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* App header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: t.navBg }}
      >
        <span className="font-bold tracking-wide" style={{ color: t.navText, fontSize: "10px" }}>
          Marca
        </span>
        <div className="flex gap-1.5">
          {["M2 4h12M2 8h12M2 12h8", "M11 11l4 4M6 11A5 5 0 106 1a5 5 0 000 10z"].map((path, i) => (
            <div
              key={i}
              className="flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: `${t.navText}20` }}
            >
              <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
                <path d={path} stroke={t.navText} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1.5 px-2.5 py-2" style={{ background: t.heroBg }}>
        {/* Hero card */}
        <div
          className="relative overflow-hidden rounded-2xl p-2.5"
          style={{ background: t.navBg, boxShadow: t.btnShadow || `0 4px 16px ${t.accentColor}25` }}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20"
            style={{ background: t.shapeBg }}
          />
          <div className="relative">
            <div className="mb-1.5 space-y-1">
              <span className="block h-3 w-[68%] rounded-full" style={{ background: t.navText, opacity: 0.95 }} />
              <span className="block h-3 w-[48%] rounded-full" style={{ background: t.navText, opacity: 0.7 }} />
            </div>
            <div className="mb-2 space-y-1">
              <span className="block h-1.5 w-full rounded-full" style={{ background: t.navText, opacity: 0.38 }} />
              <span className="block h-1.5 w-[80%] rounded-full" style={{ background: t.navText, opacity: 0.25 }} />
            </div>
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 items-center justify-center rounded-full px-3"
                style={{ background: t.btnBg, boxShadow: t.btnShadow }}
              >
                <span className="h-1.5 w-8 rounded-full" style={{ background: t.btnText, opacity: 0.85 }} />
              </div>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 5h8M5 1l4 4-4 4"
                  stroke={t.navText}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity={0.55}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature rows — 3 compactos */}
        {["◈", "◎", "◉"].map((icon, i) => (
          <div
            key={i}
            className="flex items-center gap-2 border px-2 py-1.5"
            style={{
              background: t.cardBg,
              borderColor: t.cardBorder,
              borderRadius: t.cardRadius,
            }}
          >
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center font-bold"
              style={{
                background: t.cardIconBg,
                color: t.cardIconColor,
                borderRadius: t.cardRadius,
                fontSize: "11px",
              }}
            >
              {icon}
            </div>
            <div className="flex-1 space-y-1">
              <span className="block h-2 w-[60%] rounded-full" style={{ background: t.cardTitle, opacity: 0.9 }} />
              <span className="block h-1.5 w-full rounded-full" style={{ background: t.cardBody, opacity: 0.45 }} />
            </div>
            <svg width="5" height="9" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke={t.accentColor} strokeWidth="1.4" strokeLinecap="round" opacity={0.7} />
            </svg>
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div className="border-t" style={{ background: t.pageBg, borderColor: `${t.cardBorder}80` }}>
        <div className="flex items-center justify-around px-2 py-1.5">
          {MOBILE_TAB_PATHS.map((path, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d={path}
                  stroke={i === 0 ? t.accentColor : t.cardBody}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={i === 0 ? 1 : 0.4}
                />
              </svg>
              {i === 0 && (
                <span className="h-0.5 w-3 rounded-full" style={{ background: t.accentColor }} />
              )}
            </div>
          ))}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-0.5">
          <div className="h-[3px] w-14 rounded-full" style={{ background: t.cardTitle, opacity: 0.15 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Tablet Mockup ────────────────────────────────────────────────────────────

function TabletMockup({ t }: { t: Theme }) {
  return (
    <div
      className="relative w-full overflow-hidden border-[4px]"
      style={{
        borderRadius: "14px",
        borderColor: t.windowBorder,
        background: t.heroBg,
        boxShadow: `0 0 0 2px ${t.windowBorder}20, 5px 5px 0 ${t.windowShadow}`,
      }}
    >
      {/* Camera — top center */}
      <div
        className="absolute left-1/2 top-[5px] h-[6px] w-[6px] -translate-x-1/2 rounded-full"
        style={{ background: `${t.chromeText}50` }}
      />

      <div className="flex" style={{ minHeight: "270px" }}>
        {/* Sidebar */}
        <div
          className="flex flex-col gap-1.5 px-2.5 pb-3 pt-10"
          style={{ width: "30%", background: t.navBg, borderRight: `1px solid ${t.accentColor}20` }}
        >
          {/* Logo */}
          <div className="mb-3 flex items-center gap-1.5">
            <div
              className="flex h-5 w-5 items-center justify-center rounded-md border"
              style={{
                borderColor: `${t.navText}40`,
                background: `${t.accentColor}20`,
                color: t.accentColor,
                fontSize: "9px",
              }}
            >
              ◈
            </div>
            <span className="font-bold tracking-wider" style={{ color: t.navText, fontSize: "8px" }}>
              BRAND
            </span>
          </div>

          {/* Nav items */}
          {["Dashboard", "Analytics", "Projetos", "Clientes", "Config"].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-md px-2 py-1.5"
              style={{
                background: i === 0 ? `${t.accentColor}18` : "transparent",
                borderLeft: i === 0 ? `2px solid ${t.accentColor}` : "2px solid transparent",
              }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: i === 0 ? t.accentColor : t.navText, opacity: i === 0 ? 1 : 0.3 }}
              />
              <span
                style={{
                  color: i === 0 ? t.accentColor : t.navText,
                  opacity: i === 0 ? 1 : 0.45,
                  fontWeight: i === 0 ? 600 : 400,
                  fontSize: "7px",
                }}
              >
                {item}
              </span>
            </div>
          ))}

          {/* User */}
          <div className="mt-auto flex items-center gap-1.5 pt-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{ background: `${t.accentColor}25`, color: t.accentColor, fontSize: "9px" }}
            >
              ◉
            </div>
            <div className="space-y-0.5">
              <div className="h-1.5 w-10 rounded-full" style={{ background: t.navText, opacity: 0.6 }} />
              <div className="h-1 w-7 rounded-full" style={{ background: t.navText, opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden px-3 py-3">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="h-2.5 w-20 rounded-full" style={{ background: t.heroHeading, opacity: 0.9 }} />
              <div className="mt-1 h-1.5 w-14 rounded-full" style={{ background: t.heroSub, opacity: 0.45 }} />
            </div>
            <div
              className="flex h-6 items-center rounded-full px-3"
              style={{ background: t.btnBg, boxShadow: t.btnShadow, border: t.btnBorder }}
            >
              <span className="h-1.5 w-10 rounded-full" style={{ background: t.btnText, opacity: 0.85 }} />
            </div>
          </div>

          {/* KPI cards */}
          <div className="mb-3 grid grid-cols-3 gap-2">
            {[["◈", "+24%"], ["◎", "1.8k"], ["◉", "98%"]].map(([icon, val], i) => (
              <div
                key={i}
                className="rounded-lg border p-2"
                style={{
                  background: t.cardBg,
                  borderColor: t.cardBorder,
                  borderRadius: t.cardRadius,
                  boxShadow: t.cardShadow,
                }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span style={{ color: t.cardIconColor, fontSize: "10px" }}>{icon}</span>
                  <span className="font-bold" style={{ color: t.accentColor, fontSize: "9px" }}>
                    {val}
                  </span>
                </div>
                <div className="h-1.5 w-[65%] rounded-full" style={{ background: t.cardTitle, opacity: 0.75 }} />
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div
            className="mb-2.5 rounded-lg border p-2.5"
            style={{ background: t.cardBg, borderColor: t.cardBorder, borderRadius: t.cardRadius }}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="h-2 w-16 rounded-full" style={{ background: t.cardTitle, opacity: 0.8 }} />
              <div className="flex gap-1">
                {["S", "M", "A"].map((l, i) => (
                  <div
                    key={l}
                    className="rounded px-1.5 py-0.5 font-medium"
                    style={{
                      background: i === 1 ? t.accentColor : "transparent",
                      color: i === 1 ? t.btnText : t.cardBody,
                      opacity: i === 1 ? 1 : 0.6,
                      fontSize: "6px",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-14 items-end gap-1">
              {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[2px]"
                  style={{ height: `${h}%`, background: i === 5 ? t.accentColor : `${t.accentColor}40` }}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div
            className="overflow-hidden rounded-lg border"
            style={{ borderColor: t.cardBorder, borderRadius: t.cardRadius }}
          >
            <div
              className="grid grid-cols-4 gap-2 border-b px-3 py-1.5"
              style={{ background: t.navBg, borderColor: t.cardBorder }}
            >
              {[60, 40, 40, 40].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{ width: `${w}%`, background: t.navText, opacity: 0.5 }}
                />
              ))}
            </div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-2 border-b px-3 py-1.5"
                style={{
                  background: i % 2 === 0 ? t.cardBg : "transparent",
                  borderColor: `${t.cardBorder}50`,
                }}
              >
                <div className="h-1.5 rounded-full" style={{ width: "75%", background: t.cardTitle, opacity: 0.7 }} />
                <div className="h-1.5 rounded-full" style={{ width: "50%", background: t.cardBody, opacity: 0.5 }} />
                <div className="h-1.5 rounded-full" style={{ width: "45%", background: t.cardBody, opacity: 0.4 }} />
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: "40%", background: t.accentColor, opacity: 0.65 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Laptop Mockup ────────────────────────────────────────────────────────────

function LaptopMockup({ t }: { t: Theme }) {
  return (
    <div className="w-full">
      {/* Screen */}
      <div
        className="overflow-hidden rounded-t-xl border-2 border-b-[3px]"
        style={{ borderColor: t.windowBorder, borderBottomColor: t.windowShadow, background: t.heroBg }}
      >
        {/* Menu bar */}
        <div
          className="flex items-center justify-between px-3 py-1.5"
          style={{ background: t.chromeBg }}
        >
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
            <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
            <span className="h-2 w-2 rounded-full bg-[#28CA41]" />
          </div>
          <span
            className="font-mono font-semibold"
            style={{ color: t.chromeText, fontSize: "7px" }}
          >
            Painel de Controle · Analytics
          </span>
          <div className="flex items-center gap-1" style={{ color: `${t.chromeText}70` }}>
            <span className="h-1 w-3 rounded-full bg-current" />
            <span className="h-1 w-2.5 rounded-full bg-current" />
          </div>
        </div>

        {/* Dashboard */}
        <div className="px-3 py-2.5" style={{ background: t.heroBg }}>
          {/* KPIs */}
          <div className="mb-2.5 grid grid-cols-4 gap-1.5">
            {[
              ["Visitas", "12.4k", "+18%"],
              ["Leads", "847", "+24%"],
              ["Vendas", "163", "+11%"],
              ["ROI", "340%", "+32%"],
            ].map(([, val, change], i) => (
              <div
                key={i}
                className="rounded-lg border p-1.5"
                style={{
                  background: t.cardBg,
                  borderColor: t.cardBorder,
                  borderRadius: t.cardRadius,
                  boxShadow: t.cardShadow,
                }}
              >
                <div className="h-1.5 w-[68%] rounded-full" style={{ background: t.cardBody, opacity: 0.5 }} />
                <div className="mt-1 flex items-baseline justify-between gap-0.5">
                  <span className="font-bold leading-none" style={{ color: t.cardTitle, fontSize: "9px" }}>
                    {val}
                  </span>
                  <span className="font-medium" style={{ color: t.accentColor, fontSize: "7px" }}>
                    {change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="mb-2 grid grid-cols-[1.6fr_1fr] gap-2">
            {/* Bar chart */}
            <div
              className="rounded-lg border p-2"
              style={{ background: t.cardBg, borderColor: t.cardBorder, borderRadius: t.cardRadius }}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div className="h-2 w-12 rounded-full" style={{ background: t.cardTitle, opacity: 0.8 }} />
                <div className="flex gap-0.5">
                  {["7d", "30d", "90d"].map((lbl, i) => (
                    <div
                      key={lbl}
                      className="rounded px-1"
                      style={{
                        background: i === 0 ? t.accentColor : "transparent",
                        color: i === 0 ? t.btnText : t.cardBody,
                        opacity: i === 0 ? 1 : 0.55,
                        fontSize: "6px",
                      }}
                    >
                      {lbl}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex h-14 items-end gap-0.5">
                {[35, 55, 42, 70, 58, 82, 68, 90, 75, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[1.5px]"
                    style={{ height: `${h}%`, background: i >= 7 ? t.accentColor : `${t.accentColor}38` }}
                  />
                ))}
              </div>
              <div className="mt-0.5 flex justify-between px-0.5">
                {["Jan", "Mar", "Mai", "Jul", "Set"].map((m) => (
                  <span key={m} className="font-mono" style={{ color: t.cardBody, opacity: 0.55, fontSize: "5.5px" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Donut + legend */}
            <div
              className="rounded-lg border p-2"
              style={{ background: t.cardBg, borderColor: t.cardBorder, borderRadius: t.cardRadius }}
            >
              <div className="mb-2 h-2 w-[65%] rounded-full" style={{ background: t.cardTitle, opacity: 0.8 }} />
              <div
                className="mx-auto mb-2.5 flex h-14 w-14 items-center justify-center rounded-full border-4"
                style={{ borderColor: t.accentColor, background: `${t.accentColor}12` }}
              >
                <span className="font-bold" style={{ color: t.accentColor, fontSize: "9px" }}>
                  68%
                </span>
              </div>
              <div className="space-y-1.5">
                {[
                  [t.accentColor, "68%"],
                  [`${t.accentColor}60`, "22%"],
                  [t.cardBorder, "10%"],
                ].map(([color, pct]) => (
                  <div key={pct} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                    <div className="h-1 flex-1 rounded-full" style={{ background: t.cardBody, opacity: 0.4 }} />
                    <span className="font-medium" style={{ color: t.cardBody, opacity: 0.65, fontSize: "7px" }}>
                      {pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div
            className="overflow-hidden rounded-lg border"
            style={{ borderColor: t.cardBorder, borderRadius: t.cardRadius }}
          >
            <div
              className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 border-b px-2.5 py-1"
              style={{ background: t.navBg, borderColor: t.cardBorder }}
            >
              {[80, 50, 45, 40].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: t.navText, opacity: 0.5 }} />
              ))}
            </div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 border-b px-2.5 py-1"
                style={{
                  background: i % 2 === 0 ? t.cardBg : "transparent",
                  borderColor: `${t.cardBorder}50`,
                }}
              >
                <div className="h-1.5 rounded-full" style={{ width: "78%", background: t.cardTitle, opacity: 0.72 }} />
                <div className="h-1.5 rounded-full" style={{ width: "55%", background: t.cardBody, opacity: 0.5 }} />
                <div className="h-1.5 rounded-full" style={{ width: "48%", background: t.cardBody, opacity: 0.38 }} />
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: "42%", background: t.accentColor, opacity: 0.65 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hinge */}
      <div
        className="h-[3px]"
        style={{
          background: `linear-gradient(to right, ${t.windowShadow}, ${t.windowBorder}90, ${t.windowShadow})`,
        }}
      />

      {/* Keyboard base */}
      <div
        className="overflow-hidden rounded-b-xl border-x-2 border-b-2 pb-2 pt-2"
        style={{ borderColor: t.windowBorder, background: t.chromeBg }}
      >
        <div className="mb-1.5 space-y-[3px] px-3">
          {[12, 13, 12, 11].map((keys, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-[2px]">
              {Array.from({ length: keys }).map((_, i) => (
                <div
                  key={i}
                  className="h-[5px] flex-1 rounded-[1.5px]"
                  style={{ background: t.chromeText, opacity: 0.16, maxWidth: "22px" }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto h-6 w-[45%] rounded-lg" style={{ background: t.chromeText, opacity: 0.12 }} />
      </div>
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ active, themes }: { active: number; themes: Theme[] }) {
  return (
    <div className="flex items-center gap-2">
      {themes.map((t, i) => (
        <div
          key={t.key}
          className="rounded-full transition-all duration-500"
          style={{
            width: i === active ? "24px" : "6px",
            height: "6px",
            background: i === active ? t.accentColor : "rgba(0,0,0,0.15)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  data: CustomizacaoBlockData;
  isAdmin?: boolean;
  onChange?: (d: CustomizacaoBlockData) => void;
}

export default function CustomizacaoBlock({ data, isAdmin = false, onChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textLabelRef = useRef<HTMLDivElement>(null);
  const textDescRef = useRef<HTMLDivElement>(null);
  const textTagRef = useRef<HTMLDivElement>(null);
  const deviceRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const currentStepRef = useRef(-1);
  const [activeStep, setActiveStep] = useState(0);

  const updateTextContent = useCallback((step: number) => {
    const th = THEMES[step];
    if (textLabelRef.current) textLabelRef.current.textContent = th.label;
    if (textDescRef.current) textDescRef.current.textContent = th.description;
    if (textTagRef.current) textTagRef.current.textContent = th.tag;
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.getById("customizacao-pin")?.kill();

      // Init: show first device, hide rest
      deviceRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, {
            opacity: i === 0 ? 1 : 0,
            scale: i === 0 ? 1 : 0.96,
            y: 0,
            pointerEvents: i === 0 ? "auto" : "none",
          });
        }
      });
      currentStepRef.current = 0;

      const nThemes = THEMES.length;
      const leadProgress = VH_LEAD_IN / TOTAL_SCROLL_VH;

      const pinTrigger = ScrollTrigger.create({
        id: "customizacao-pin",
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${(window.innerHeight * TOTAL_SCROLL_VH) / 100}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const styleProgress =
            p <= leadProgress
              ? 0
              : ((p - leadProgress) / (1 - leadProgress)) * (nThemes - 1);
          const step = Math.min(Math.floor(styleProgress + 0.15), nThemes - 1);

          if (step !== currentStepRef.current) {
            const prevStep = currentStepRef.current;
            currentStepRef.current = step;
            setActiveStep(step);

            // Text: fade out → update → fade in
            const textEls = [
              textLabelRef.current,
              textDescRef.current,
              textTagRef.current,
            ].filter(Boolean) as HTMLElement[];

            const tl = gsap.timeline();
            tl.to(textEls, { opacity: 0, y: -8, duration: 0.2, ease: "power2.in" })
              .call(() => { updateTextContent(step); })
              .to(textEls, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });

            // Device: slide out previous → slide in next
            const prevEl = deviceRefs.current[prevStep];
            const nextEl = deviceRefs.current[step];

            if (prevEl) {
              prevEl.style.pointerEvents = "none";
              gsap.to(prevEl, {
                opacity: 0,
                scale: 0.91,
                y: 16,
                duration: 0.32,
                ease: "power2.in",
              });
            }
            if (nextEl) {
              gsap.fromTo(
                nextEl,
                { opacity: 0, scale: 1.05, y: -18 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.52,
                  ease: "power2.out",
                  delay: 0.2,
                  onStart: () => {
                    nextEl.style.pointerEvents = "auto";
                  },
                }
              );
            }
          }
        },
      });

      queueMicrotask(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        pinTrigger.kill();
        ScrollTrigger.getById("customizacao-pin")?.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  const currentTheme = THEMES[activeStep];

  return (
    <section
      ref={sectionRef}
      id="customizacao"
      className="proposal-section relative overflow-x-clip overflow-y-visible bg-white"
    >
      <div className="proposal-container relative z-10 overflow-x-clip overflow-y-visible bg-white pb-4 md:pb-6">
        {/* Section header */}
        <header className="mb-8 text-center md:mb-14">
          <span className="mb-3 inline-block rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            Feito para você
          </span>
          <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "Seu site, sua identidade"}
              onChange={(v) => onChange?.({ ...data, titulo: v })}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500 md:text-lg">
            <EditableField
              value={
                data.subtitulo ??
                "Cada projeto é construído do zero — seguindo a história, os gostos e o posicionamento de cada cliente."
              }
              onChange={(v) => onChange?.({ ...data, subtitulo: v })}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
        </header>

        {/* Main: text left + device right */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* Left: morphing text */}
          <div className="flex flex-col gap-5 lg:order-1">
            <StepIndicator active={activeStep} themes={THEMES} />

            <div className="space-y-2">
              <div
                ref={textTagRef}
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: currentTheme.accentColor, transition: "color 0.5s ease" }}
              >
                {THEMES[0].tag}
              </div>
              <div
                ref={textLabelRef}
                className="text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl"
              >
                {THEMES[0].label}
              </div>
              <div
                ref={textDescRef}
                className="text-base leading-relaxed text-neutral-500 md:text-lg"
              >
                {THEMES[0].description}
              </div>
            </div>

            {/* Device chip */}
            <div
              className="flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-500"
              style={{
                borderColor: currentTheme.accentColor,
                color: currentTheme.accentColor,
                background: `${currentTheme.accentColor}10`,
              }}
            >
              <DeviceIcon device={currentTheme.device} color={currentTheme.accentColor} />
              <span className="text-[11px] font-semibold">{currentTheme.deviceLabel}</span>
            </div>

            {/* Scroll hint */}
            <div className="flex select-none items-center gap-2 text-[11px] text-neutral-400">
              <svg
                className="animate-bounce"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 3v10M4 9l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Role para explorar os estilos</span>
            </div>

            {/* Counter */}
            <div className="font-mono text-[11px] tabular-nums text-neutral-400">
              {activeStep + 1} / {THEMES.length}
            </div>
          </div>

          {/* Right: device mockups */}
          <div className="relative lg:order-2">
            {/* Fundo suave contido no bloco (sem blur — blur era cortado por overflow-x-clip e formava uma “linha”) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl transition-[background] duration-700 ease-out"
              style={{
                background: `radial-gradient(ellipse 92% 78% at 50% 42%, color-mix(in srgb, ${currentTheme.accentColor} 16%, transparent) 0%, transparent 72%)`,
              }}
            />

            {/* Device switcher container — height must accommodate tallest device (~414px for mobile) */}
            <div className="relative" style={{ height: "450px" }}>
              {THEMES.map((th, i) => (
                <div
                  key={th.key}
                  ref={(el) => {
                    deviceRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? "auto" : "none" }}
                >
                  {th.device === "desktop" && <DesktopMockup t={th} />}
                  {th.device === "mobile" && <MobileMockup t={th} />}
                  {th.device === "tablet" && <TabletMockup t={th} />}
                  {th.device === "laptop" && <LaptopMockup t={th} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges — device + style */}
        <div
          id="customizacao-estilos"
          className="mt-8 flex flex-wrap justify-center gap-3 border-t border-neutral-100 pt-6 md:mt-12 md:pt-8"
        >
          {THEMES.map((th, i) => (
            <div
              key={th.key}
              className="flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-300"
              style={{
                borderColor: i === activeStep ? th.accentColor : "#E5E7EB",
                background: i === activeStep ? `${th.accentColor}12` : "transparent",
              }}
            >
              <DeviceIcon
                device={th.device}
                color={i === activeStep ? th.accentColor : "#9CA3AF"}
              />
              <span
                className="text-[11px] font-medium"
                style={{ color: i === activeStep ? th.accentColor : "#9CA3AF" }}
              >
                {th.deviceLabel} · {th.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
