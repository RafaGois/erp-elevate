import { VideoPlayer } from "@/components/ui/video-thumbnail-player";

export default function InstitutionalVideo() {
  return (
    <div id="institutional-video" className="w-full relative flex justify-center items-center h-[70svh] mx-auto p-4 bg-black">
    <VideoPlayer
      thumbnailUrl="https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png?q=80&w=2069&auto=format&fit=crop"
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      title="Nos Conheça"
      description="Um pouquinho da nossa história para você."
      className="rounded-xl max-w-2xl z-30"
    />
    <div className="bg-white opacity-5 absolute z-10 w-80 h-64 rounded-xl right-[33%] bottom-[20%] ">

    </div>
  </div>
  );
}
