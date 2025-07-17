import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "~/hooks/use-theme";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};

const AUDIO_SRC = {
  light: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  dark: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
};

function getAudioTheme(theme: string) {
  return theme === "light" ? "light" : "dark";
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme] = useTheme();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [isPlaying]);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      <audio
        ref={audioRef}
        src={AUDIO_SRC[getAudioTheme(theme)]}
        loop
        style={{ display: "none" }}
        autoPlay
      >
        <track kind="captions" label="Background music captions" />
      </audio>
      {children}
    </AudioContext.Provider>
  );
};
