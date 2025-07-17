import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { previewImages } from "~/constants/preview-images";

const images = previewImages.map((img) => img.src);

export function PreviewSection() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<{ width: number; height: number }>(
    {
      width: 0,
      height: 0,
    },
  );

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative">
      <div className="h-screen" />
      <div
        ref={gallery}
        className="h-[175vh] bg-background relative flex gap-[2vw] p-[2vw] overflow-hidden box-border"
      >
        <Column
          images={[images[0], images[1], images[2]]}
          y={y}
          offset="-45%"
        />
        <Column
          images={[images[3], images[4], images[5]]}
          y={y2}
          offset="-95%"
        />
        <Column
          images={[images[6], images[7], images[8]]}
          y={y3}
          offset="-45%"
        />
        <Column
          images={[images[9], images[10], images[11]]}
          y={y4}
          offset="-75%"
        />
      </div>
      <div className="h-screen" />
    </main>
  );
}

function Column({
  images,
  y,
  offset,
}: {
  images: string[];
  y: MotionValue<number>;
  offset: string;
}) {
  return (
    <motion.div
      className="relative h-full w-[25%] min-w-[250px] flex flex-col gap-[2vw]"
      style={{ y, top: offset }}
    >
      {images.map((src) => (
        <div
          key={src}
          className="relative w-full h-full rounded-[1vw] overflow-hidden"
        >
          <img
            width={300}
            height={450}
            src={`${src}`}
            alt="scroll-img"
            className="w-full h-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ))}
    </motion.div>
  );
}
