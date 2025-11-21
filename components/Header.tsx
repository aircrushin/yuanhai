import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center py-8 px-4 text-center border-b border-stone-300 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stone-200 rounded-full opacity-50 blur-2xl -z-10"></div>
      
      <div className="mb-2">
        <span className="inline-block px-3 py-1 border border-cinnabar text-cinnabar text-xs tracking-[0.3em] rounded-sm">
          甲辰年 · 天干地支
        </span>
      </div>
      
      <h1 className="font-calligraphy text-5xl md:text-6xl text-tao-ink mb-3 ink-glow">
        渊海·命理
      </h1>
      
      <p className="font-serif text-stone-600 italic text-sm md:text-base max-w-md leading-relaxed">
        "命由天定，运可人为。<br/>且看这一生造化如何流转。"
      </p>

      <div className="absolute top-6 right-6 opacity-20 md:opacity-40 pointer-events-none">
        <div className="w-16 h-16 border-4 border-cinnabar rounded-sm transform rotate-45 grid grid-cols-2 grid-rows-2 gap-1 p-1">
           <div className="bg-cinnabar w-full h-full"></div>
           <div className="w-full h-full"></div>
           <div className="w-full h-full"></div>
           <div className="bg-cinnabar w-full h-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;