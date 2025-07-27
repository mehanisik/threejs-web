import { Navbar } from "../layout/navbar";

export function LandingSection() {
  return (
    <div
      id="home"
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      <Navbar />

      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Grid Pattern"
          >
            <title>Grid Pattern Background</title>
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map(() => (
            <div
              key={crypto.randomUUID()}
              className="absolute w-1 h-1 bg-foreground rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={crypto.randomUUID()}
              className="absolute h-px bg-gradient-to-r from-transparent via-foreground to-transparent opacity-20"
              style={{
                width: "200%",
                top: `${20 + i * 20}%`,
                left: "-50%",
                animation: `slide ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-start h-full p-8 md:p-12">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight leading-tight uppercase font-mono">
              Design Done Differently
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
