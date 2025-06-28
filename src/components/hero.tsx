import { Canvas } from '@react-three/fiber';
import Model from './model';
import { Suspense } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';

import Rig from './rig';
import Light from './light';




export default function Hero() {

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#ff96fa]">
       <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 160, 160], fov: 20 }}>
      <fog attach="fog" args={['lightpink', 60, 100]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Model position={[-4.5, -4, 0]} rotation={[0, -2.8, 0]} />
        <spotLight position={[50, 50, -30]} castShadow />
        <pointLight position={[-10, -10, -10]} color="red" intensity={3} />
        <pointLight position={[0, -5, 5]} intensity={0.5} />
        <directionalLight position={[0, -5, 0]} color="red" intensity={2} />
        <Light />
        <Environment preset="forest" />
        <Rig />
      </Suspense>
      <OrbitControls  makeDefault />
    </Canvas>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-8 left-8 font-sans font-light text-3xl tracking-wide text-white drop-shadow-md">
          unseen <span className="font-normal">studio</span>
        </div>
        <nav className="absolute top-10 right-12 flex gap-8 font-sans text-xl text-[#222]">
          <a href="#" className="text-inherit no-underline pointer-events-auto">Index</a>
          <a href="#" className="text-inherit no-underline pointer-events-auto">Projects</a>
          <a href="#" className="text-inherit no-underline pointer-events-auto">Contact</a>
          <Button className="w-10 h-10 rounded-full shadow-md pointer-events-auto text-2xl">⋯</Button>
        </nav>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full text-[#222]">
          <div className="font-sans text-lg tracking-wider mb-2 font-normal">
            A BRAND, DIGITAL & MOTION STUDIO
          </div>
          <div className="font-serif text-7xl font-normal italic leading-none mb-[-16px]">
            Creating the
          </div>
          <div className="font-sans text-8xl font-semibold tracking-tighter mb-8">
            unexpected
          </div>
          <Button className="text-xl px-8 py-3 rounded-3xl  shadow-md pointer-events-auto cursor-pointer">
            View our work &rarr;
          </Button>
        </div>
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 text-3xl bg-white/70 rounded-full w-12 h-12 flex items-center justify-center pointer-events-auto shadow-md">
          🌐
        </div>
        <div className="absolute right-8 bottom-8 text-lg text-white opacity-80">
          ©2025
        </div>
      </div>
     
    </div>
  );
} 