import React from 'react';

export const BrandLogo = ({ className = "h-6 w-6", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 
          REFINED LOGO: 
          Apple top with leaf + Sharp Molar Cusp bottom edges.
      */}
      
      {/* Main Container Path */}
      <path 
        d="M12 5C10 3 6 3 4.5 6C3 10 3.5 13 4 15C4.5 17 5 18.5 4 21C6 21.5 8 20.5 10 19.5C11.5 18.5 12 18 12 18C12 18 12.5 18.5 14 19.5C16 20.5 18 21.5 20 21C19 18.5 19.5 17 20 15C20.5 13 21 10 19.5 6C18 3 14 3 12 5Z" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Top Cleft */}
      <path 
        d="M12 5V8" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* The Leaf */}
      <path 
        d="M12 5C12 5 13 1.5 17 2" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
      />

      {/* Detail line to separate upper apple mass from lower tooth cusps */}
      <path 
        d="M5.5 13C7 14.5 17 14.5 18.5 13" 
        stroke={color} 
        strokeWidth="1.2" 
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
};

export const BrandIconContainer = ({ className }) => (
    <div className={`relative flex items-center justify-center rounded-xl overflow-hidden group shadow-lg ${className}`}>
        {/* Deep Black/Zinc App Icon Base */}
        <div className="absolute inset-0 bg-zinc-950 border border-white/10 rounded-xl transition-all duration-500 group-hover:border-white/30" />
        
        {/* Top-edge internal reflection */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* The Logo with high contrast */}
        <BrandLogo className="relative h-[68%] w-[68%] text-white transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
    </div>
);
