import { AudioLines, Pause } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";
import { Button } from "./button";

export const AudioButton = () => {
  const { audioElement, isPlaying, handleToggle } = useAudio();
  return (
    <div className="flex items-center p-2 rounded-xl bg-transparent">
      {audioElement}
      <Button
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={handleToggle}
        className="px-5 py-3 rounded-full border border-foreground focus:outline-none focus-visible:ring-2 ring-primary transition hover:bg-primary/10"
      >
        {isPlaying ? (
          <span className="inline-flex">
            <AudioLines className="w-6 h-6 text-foreground " />
          </span>
        ) : (
          <Pause className="w-6 h-6 text-foreground " />
        )}
      </Button>
    </div>
  );
};
