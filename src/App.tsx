import Hero from './components/hero';
import { useState,useEffect } from 'react';
import Preloader from './components/preloader';



export default function App() {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev + 1)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return progress < 100 ? <Preloader progress={progress} /> : <Hero />;
}