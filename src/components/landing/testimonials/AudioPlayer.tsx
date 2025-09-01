import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  onAudioStateChange?: (isPlaying: boolean) => void;
}

export default function AudioPlayer({ onAudioStateChange }: AudioPlayerProps) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [audioSrc] = useState("https://res.cloudinary.com/dn454izoh/video/upload/v1756756533/WhatsApp_Audio_2025-09-01_at_16.23.06_rey6pk.ogg"); // Caminho opcional para o áudio
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Notifica o componente pai sobre mudanças no estado do áudio
    useEffect(() => {
      onAudioStateChange?.(isPlaying);
    }, [isPlaying, onAudioStateChange]);

    // Atualiza o tempo atual e duração do áudio
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
      };

      const updateDuration = () => {
        setDuration(audio.duration || 0);
        setIsLoading(false);
      };

      const handleLoadStart = () => {
        setIsLoading(true);
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('loadeddata', updateDuration);
      audio.addEventListener('loadstart', handleLoadStart);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('loadeddata', updateDuration);
        audio.removeEventListener('loadstart', handleLoadStart);
      };
    }, []);

    // Função para formatar tempo em MM:SS
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Função para calcular o progresso em porcentagem
    const getProgressPercentage = () => {
      if (duration === 0) return 0;
      return (currentTime / duration) * 100;
    };

    // Função para navegar no áudio ao clicar na barra de progresso
    const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || duration === 0) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };
  
    const toggleAudio = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
      }
    };

    return (
        <div>
              
          {/* Player de Áudio Opcional */}
          <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className="w-12 h-12 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center group"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                <div>
                  <p className="text-sm font-medium text-white">Áudio de relato</p>
                  <p className="text-xs text-white/60">
                    {isLoading ? "Carregando..." : formatTime(duration)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-24 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-white/60 rounded-full transition-all duration-300" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
              </div>
            </div>
            
            {/* Elemento de áudio oculto */}
            <audio
              ref={audioRef}
              src={audioSrc}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        </div>
    )
}