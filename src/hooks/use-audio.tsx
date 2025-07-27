import { useRef, useState } from "react";

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((_error) => {
        // Audio play failed - handled gracefully
      });
      setIsPlaying(true);
    }
  };

  const audioElement = (
    <audio ref={audioRef} src={"/audio.mp3"} preload="auto" autoPlay>
      <track kind="captions" />
    </audio>
  );

  return { audioElement, isPlaying, handleToggle };
};
