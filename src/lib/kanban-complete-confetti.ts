import confetti from "canvas-confetti";

const PALETTE = [
  "#22c55e",
  "#16a34a",
  "#4ade80",
  "#86efac",
  "#bbf7d0",
  "#eab308",
  "#fde047",
  "#ffffff",
];

/** Celebração ao mover tarefa para Concluída no kanban (respeita reduced motion). */
export function fireKanbanCompleteConfetti() {
  if (typeof window === "undefined") return;

  const base = {
    colors: PALETTE,
    disableForReducedMotion: true,
    zIndex: 9999,
    gravity: 0.88,
    scalar: 1.05,
  };

  void confetti({
    ...base,
    particleCount: 95,
    spread: 88,
    startVelocity: 48,
    ticks: 180,
    origin: { x: 0.5, y: 0.62 },
  });

  window.setTimeout(() => {
    void confetti({
      ...base,
      particleCount: 55,
      spread: 110,
      startVelocity: 38,
      ticks: 160,
      origin: { x: 0.5, y: 0.52 },
    });
  }, 140);

  window.setTimeout(() => {
    void confetti({
      ...base,
      particleCount: 40,
      spread: 65,
      angle: 125,
      startVelocity: 36,
      ticks: 150,
      origin: { x: 0.18, y: 0.68 },
    });
    void confetti({
      ...base,
      particleCount: 40,
      spread: 65,
      angle: 55,
      startVelocity: 36,
      ticks: 150,
      origin: { x: 0.82, y: 0.68 },
    });
  }, 90);
}
