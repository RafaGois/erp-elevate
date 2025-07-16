"use client";

import Menu from "./hero/Menu";

export default function Hero() {

  return (
    <div className="flex flex-col items-center h-screen p-4 box-border">
      <Menu />
      <div className="flex flex-col items-start justify-center h-full w-full">
        <small>Transformando sua presença digital em autoridade</small>
        <h1 className="text-4xl font-bold">Titulo</h1>
      </div>
    </div>
  );
}
