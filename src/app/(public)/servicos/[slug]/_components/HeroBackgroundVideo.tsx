"use client";

import { useEffect, useRef } from "react";

type HeroBackgroundVideoProps = {
  src: string;
  poster?: string;
};

export default function HeroBackgroundVideo({
  src,
  poster,
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false;

    const play = () => {
      void video.play().catch(() => {});
    };

    const onLoaded = () => play();

    video.addEventListener("loadedmetadata", onLoaded);

    if (video.readyState >= 1) play();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="slp-hero__video"
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
    />
  );
}
