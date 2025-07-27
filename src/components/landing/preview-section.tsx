import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useHackerText } from "@/hooks/use-hacker-text";
import { useSupabase } from "@/hooks/use-supabase";
import supabase from "@/lib/supabase";

export function PreviewSection() {
  const { data: images } = useSupabase({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("type", "preview");
      return { data, error, status: 200, statusText: "OK" };
    },
  });

  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { amount: 0.3, once: true });
  const titleHacker = useHackerText("Portfolio Gallery");

  const galleryRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const { height } = dimensions;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  const previewImages = images?.filter((i) => i.type === "preview") || [];
  const columns = [
    {
      images: previewImages.slice(0, 3),
      yTransform: y1,
      offset: "-45%",
    },
    {
      images: previewImages.slice(3, 6),
      yTransform: y2,
      offset: "-95%",
    },
    {
      images: previewImages.slice(6, 9),
      yTransform: y3,
      offset: "-45%",
    },
    {
      images: previewImages.slice(9, 12),
      yTransform: y4,
      offset: "-75%",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative bg-background overflow-hidden border-b border-border">
      <div ref={inViewRef} className="px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          className="flex items-baseline justify-end gap-3 md:gap-6 mb-12 md:mb-16"
        >
          <motion.span
            className="text-4xl md:text-6xl lg:text-8xl font-thin text-foreground/30 font-mono"
            initial={{ opacity: 0, rotate: -45 }}
            animate={
              isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -45 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            03
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl uppercase font-extrabold tracking-tight cursor-pointer font-mono"
            onMouseEnter={titleHacker.startHacking}
            onMouseLeave={titleHacker.stopHacking}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {titleHacker.displayText}
            {titleHacker.isHacking && (
              <motion.span
                className="opacity-75"
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                |
              </motion.span>
            )}
          </motion.h1>
        </motion.div>

        <motion.div
          className="w-24 md:w-32 lg:w-40 h-px bg-foreground/30 ml-auto"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.div
          className="mt-8 md:mt-12 max-w-2xl ml-auto text-right"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
            A curated collection showcasing the intersection of creativity and
            functionality. Each piece represents a moment of inspiration
            transformed into digital reality.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative"
      >
        <div className="h-32 md:h-48" />

        <div
          ref={galleryRef}
          className="h-[175vh] bg-background relative flex gap-[2vw] p-[2vw] overflow-hidden"
          style={{ position: "relative" }}
        >
          {columns.map((column, columnIndex) => (
            <motion.div
              key={columnIndex.toString()}
              className="relative h-full w-[25%] min-w-[250px] flex flex-col gap-[2vw]"
              style={{
                y: column.yTransform,
                top: column.offset,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.8 + columnIndex * 0.1 }}
            >
              {column.images.map((imageSrc, imageIndex) => (
                <motion.div
                  key={`${columnIndex}-${imageIndex.toString()}`}
                  className="relative w-full h-full overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.95 }
                  }
                >
                  <div className="w-full h-full border border-foreground/10 group-hover:border-foreground/20 transition-colors duration-300 overflow-hidden">
                    <img
                      src={imageSrc.url}
                      alt={`Gallery artwork ${columnIndex + 1}-${imageIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                      loading="lazy"
                    />
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  />

                  <motion.div
                    className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="h-32 md:h-48" />
      </motion.div>
    </section>
  );
}
