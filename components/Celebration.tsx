import React, { useEffect } from 'react';

const Celebration: React.FC = () => {
  useEffect(() => {
    // Dynamically load confetti script to ensure it works in this environment
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    script.onload = () => {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        // @ts-ignore
        window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        // @ts-ignore
        window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-1000 z-50">
      <div className="mb-8">
        <span className="text-9xl">💐</span>
      </div>
      
      <h1 className="font-romantic text-6xl md:text-8xl text-red-600 mb-6 drop-shadow-lg">
        Congratulations!
      </h1>
      
      <div className="max-w-2xl bg-white/60 backdrop-blur-sm p-8 rounded-3xl border-4 border-red-200 shadow-xl">
        <p className="text-3xl md:text-4xl font-dancing font-bold text-red-500 leading-relaxed">
          You are now officially <br />
          <span className="text-red-700 underline decoration-red-300">Noor’s Valentine</span>.
        </p>
      </div>

      <div className="mt-12 flex gap-4">
        <span className="text-4xl animate-bounce">💖</span>
        <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>💍</span>
        <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
      </div>
      
      <div className="fixed inset-0 pointer-events-none opacity-5 flex flex-wrap gap-10 p-4 select-none rotate-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="text-9xl font-black text-red-900">NOOR X NOOR</span>
        ))}
      </div>
    </div>
  );
};

export default Celebration;