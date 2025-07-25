import { useEffect, useRef, useState } from "react";

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play();
    setIsPlaying(true);
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const audioElement = (
    <audio ref={audioRef} src={"/audio.mp3"} preload="auto">
      <track kind="captions" />
    </audio>
  );

  return { audioElement, isPlaying, handleToggle };
};
