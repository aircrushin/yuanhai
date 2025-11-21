import React, { useEffect, useState } from 'react';

const phrases = [
  "校正真太阳时...",
  "排定四柱八字...",
  "推算五行旺衰...",
  "审视格局清浊...",
  "洞察大运流年...",
  "渊海宗师沉思中..."
];

const Loader: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      {/* Yin Yang Spinner */}
      <div className="relative w-24 h-24 animate-spin duration-[3000ms] rounded-full shadow-xl border-4 border-stone-200">
        <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
          {/* Left Black Side (covers 50%) */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-tao-ink"></div>
          
          {/* Top Black Circle (Head of Yin) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-tao-ink rounded-full flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          
          {/* Bottom White Circle (Head of Yang) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-tao-ink rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="font-serif text-xl text-tao-ink animate-pulse">
          {phrases[phraseIndex]}
        </p>
        <p className="text-sm text-stone-500 mt-2 font-light">
          天地玄黄 · 宇宙洪荒
        </p>
      </div>
    </div>
  );
};

export default Loader;