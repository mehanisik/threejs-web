import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [cookies, setCookie] = useCookies(["isPlaying"]);

  useEffect(() => {
    let didCancel = false;
    const tryAutoplay = async () => {
      const shouldPlay = cookies.isPlaying === "true";
      if (!shouldPlay) return;

      const audio = audioRef.current;
      if (!audio) return;

      const play = async () => {
        try {
          await audio.play();
          if (!didCancel) setIsPlaying(true);
        } catch (err) {
          throw new Error(`Auto-play blocked ${err}`);
        }
      };

      if (audio.readyState >= 3) {
        void play();
      } else {
        const onCanPlay = () => {
          audio.removeEventListener("canplay", onCanPlay);
          void play();
        };
        audio.addEventListener("canplay", onCanPlay);
      }
    };

    void tryAutoplay();

    return () => {
      didCancel = true;
    };
  }, [cookies.isPlaying]);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setCookie("isPlaying", "false", { path: "/", sameSite: "lax" });
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        setCookie("isPlaying", "true", { path: "/", sameSite: "lax" });
      } catch (err) {
        console.error("Audio play failed", err);
      }
    }
  };

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.visibilityState !== "visible" && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const audioElement = (
    <audio ref={audioRef} src="/audio.mp3" preload="auto">
      <track kind="captions" />
    </audio>
  );

  return { audioElement, isPlaying, handleToggle };
};
