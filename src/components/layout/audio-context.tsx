import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  setMusicSource: (src: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({
  children,
  initialSource = "/audio.mp3",
  fadeDuration = 1000,
}: {
  children: ReactNode;
  initialSource?: string;
  fadeDuration?: number;
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<string>(initialSource);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const isFadingRef = useRef<boolean>(false);

  const fadeAudio = useCallback(
    (from: number, to: number, duration: number, onEnd?: () => void) => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      const step = (to - from) / (duration / 10);
      let current = from;
      audio.volume = from;
      const fade = () => {
        current += step;
        if ((step > 0 && current >= to) || (step < 0 && current <= to)) {
          audio.volume = to;
          if (onEnd) onEnd();
          return;
        }
        audio.volume = current;
        setTimeout(fade, 10);
      };
      fade();
    },
    [],
  );

  useEffect(() => {
    audioRef.current = new Audio(audioSource);
    const audio = audioRef.current;
    audio.loop = true;

    if (isPlaying) audio.play().then(() => fadeAudio(0, 1, fadeDuration));

    const handleTimeUpdate = () => {
      if (!audio || isFadingRef.current) return;
      const timeRemaining = audio.duration - audio.currentTime;
      if (timeRemaining <= fadeDuration / 1000) {
        fadeAudio(1, 0, timeRemaining * 1000, () => {
          audio.currentTime = 0;
          fadeAudio(0, 1, fadeDuration);
        });
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSource, fadeDuration, fadeAudio, isPlaying]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      fadeAudio(audio.volume, 0, fadeDuration, () => {
        audio.pause();
      });
      setIsPlaying(false);
    } else {
      audio.play().then(() => fadeAudio(0, 1, fadeDuration));
      setIsPlaying(true);
    }
  };

  const setMusicSource = (src: string) => {
    const audio = audioRef.current;
    if (!audio || src === audioSource) return;
    if (isPlaying) {
      fadeAudio(audio.volume, 0, fadeDuration, () => setAudioSource(src));
    } else setAudioSource(src);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, setMusicSource }}>
      {children}
    </AudioContext.Provider>
  );
};
