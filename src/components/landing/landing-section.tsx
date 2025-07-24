import { Navbar } from "../layout/navbar";

export const LandingSection = () => {
  return (
    <div className="h-screen bg-background grid items-center w-full">
      <Navbar />
      <h1 className="text-4xl md:text-6xl lg:text-8xl uppercase font-extrabold mb-5 tracking-tight text-right">
        PORTFOLIO
      </h1>
    </div>
  );
};
