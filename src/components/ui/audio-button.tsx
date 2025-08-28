import { AnimatePresence, motion } from "framer-motion";
import { AudioLines, Pause } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";

export const AudioButton = () => {
  const { audioElement, isPlaying, handleToggle } = useAudio();

  return (
    <div className="fixed left-8 bottom-8 z-50">
      <div className="flex items-center">
        {audioElement}

        <motion.button
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={handleToggle}
          whileTap={{ scale: 0.9, rotate: -5 }}
          animate={{
            scale: isPlaying ? [1, 1.1, 1] : 1,
          }}
          transition={{
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            repeatType: "loop",
            duration: 0.6,
          }}
          className="px-5 py-3 border border-foreground/20 rounded-full text-foreground flex items-center justify-center focus:outline-none focus-visible:ring-2 ring-primary"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.span
                key="playing"
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: [0, -10, 10, -10, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                className="inline-flex"
              >
                <AudioLines className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="paused"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Pause className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};
