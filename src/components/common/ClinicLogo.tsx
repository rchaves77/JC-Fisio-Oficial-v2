import React from 'react';

interface ClinicLogoProps {
  variant?: 'header' | 'sidebar' | 'login' | 'certificate' | 'large';
  showSubtitle?: boolean;
  className?: string;
  onLogoClick?: () => void;
}

const LOGO_SRC = '/LogoJC.png';

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  variant = 'header',
  className = '',
  onLogoClick,
}) => {
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
      <div className={`relative overflow-hidden rounded-xl bg-white border border-slate-200/90 shadow-xs shrink-0 flex items-center justify-center p-1.5 transition-all group-hover:border-slate-300 ${imgSizeClasses[variant]}`}>
        <img
          src={LOGO_SRC}
          alt="Jucelino Castro Fisioterapia"
          className="h-full w-auto object-contain max-h-full"
        />
      </div>
    </div>
  );
};
