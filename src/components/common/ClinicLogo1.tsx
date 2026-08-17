import React, { useState, useEffect } from 'react';

interface ClinicLogoProps {
  variant?: 'header' | 'sidebar' | 'login' | 'certificate' | 'large';
  showSubtitle?: boolean;
  className?: string;
  onLogoClick?: () => void;
}

// 3D Rendering of the original Jucelino Castro Fisioterapia Brand Logo
export const Official3DLogoImage: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({
  className = '',
  size = 'md',
}) => {
  const containerSizes = {
    sm: 'h-10 px-2 py-1',
    md: 'h-12 px-2.5 py-1',
    lg: 'h-16 px-4 py-2',
    xl: 'h-32 px-6 py-4',
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden shrink-0 select-none ${containerSizes[size]} ${className}`}
    >
      {/* 3D Gloss highlight */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

      {/* 3D Emblem (J + Red Sphere + C) */}
      <div className="relative flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]">
        <svg
          viewBox="0 0 110 90"
          className={size === 'xl' ? 'h-20 w-24' : size === 'lg' ? 'h-10 w-12' : 'h-7 w-8'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Red Sphere 3D Radial */}
            <radialGradient id="sphere3d" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FF4D4D" />
              <stop offset="40%" stopColor="#DC2626" />
              <stop offset="85%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#450A0A" />
            </radialGradient>

            {/* Blue J 3D Linear */}
            <linearGradient id="blueJ3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="35%" stopColor="#1D4ED8" />
              <stop offset="75%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Blue C 3D Linear */}
            <linearGradient id="blueC3d" x1="30%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="80%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>

          {/* Red 3D Sphere on top of J */}
          <circle cx="36" cy="15" r="9" fill="url(#sphere3d)" />

          {/* Blue 3D 'J' Stem */}
          <path
            d="M42 24 C50 18, 56 27, 52 40 C47 55, 33 74, 6 83 C21 75, 43 59, 49 47 C54 38, 46 30, 42 24 Z"
            fill="url(#blueJ3d)"
          />

          {/* Blue 3D 'C' Crescent */}
          <path
            d="M52 17 C83 17, 104 36, 104 60 C104 82, 81 92, 52 89 C75 87, 92 74, 92 57 C92 39, 75 25, 52 17 Z"
            fill="url(#blueC3d)"
          />
        </svg>
      </div>

      {/* 3D Typography "JUCELINO CASTRO" and "FISIOTERAPIA" */}
      <div className="flex flex-col items-center justify-center leading-none mt-0.5">
        <span
          className={`font-black tracking-tighter text-blue-900 ${
            size === 'xl' ? 'text-lg' : size === 'lg' ? 'text-xs' : 'text-[9px]'
          }`}
          style={{
            textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 2px 4px rgba(15,23,42,0.5)',
            letterSpacing: size === 'xl' ? '0.02em' : '-0.02em',
          }}
        >
          JUCELINO CASTRO
        </span>
        <span
          className={`font-black tracking-widest text-red-700 uppercase ${
            size === 'xl' ? 'text-sm mt-1' : size === 'lg' ? 'text-[9px] mt-0.5' : 'text-[7px]'
          }`}
          style={{
            textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 2px 3px rgba(127,29,29,0.5)',
          }}
        >
          FISIOTERAPIA
        </span>
      </div>
    </div>
  );
};

const DEFAULT_LOGO_SOURCES = [
  '/LogoJC.png',
  '/LogoJC.svg',
  'https://raw.githubusercontent.com/rchaves77/JC-Fisio2026/main/public/LogoJC.png',
];

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  variant = 'header',
  showSubtitle = true,
  className = '',
  onLogoClick,
}) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('jc_clinic_logo');
  });
  const [use3dFallback, setUse3dFallback] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setCustomLogoUrl(localStorage.getItem('jc_clinic_logo'));
      setSourceIndex(0);
      setUse3dFallback(false);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const currentSrc = customLogoUrl || DEFAULT_LOGO_SOURCES[sourceIndex];

  const handleImageError = () => {
    if (customLogoUrl) {
      setUse3dFallback(true);
    } else if (sourceIndex < DEFAULT_LOGO_SOURCES.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setUse3dFallback(true);
    }
  };

  const sizeMap: Record<string, 'sm' | 'md' | 'lg' | 'xl'> = {
    header: 'sm',
    sidebar: 'sm',
    login: 'xl',
    certificate: 'lg',
    large: 'xl',
  };

  const imgSizeClasses = {
    header: 'h-14 sm:h-16 w-auto max-w-[240px]',
    sidebar: 'h-12 w-auto max-w-[180px]',
    login: 'h-32 sm:h-44 w-auto max-w-[340px]',
    certificate: 'h-20 w-auto max-w-[280px]',
    large: 'h-32 sm:h-44 w-auto max-w-[340px]',
  };

  return (
    <div
      onClick={onLogoClick}
      className={`inline-flex items-center select-none ${onLogoClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Jucelino Castro Fisioterapia & Quiropraxia"
    >
      {currentSrc && !use3dFallback ? (
        <div className={`relative overflow-hidden rounded-xl bg-white border border-slate-200/90 shadow-xs shrink-0 flex items-center justify-center p-1.5 transition-all group-hover:border-slate-300 ${imgSizeClasses[variant]}`}>
          <img
            src={currentSrc}
            alt="Jucelino Castro Fisioterapia"
            onError={handleImageError}
            className="h-full w-auto object-contain group-hover:scale-105 transition-transform max-h-full"
          />
        </div>
      ) : (
        <Official3DLogoImage size={sizeMap[variant]} />
      )}
    </div>
  );
};
