import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Lock,
  Menu,
  X,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { ClinicLogo } from '../../../components/common/ClinicLogo';
import { CLINIC_INFO } from '../data/servicesData';

interface PublicNavbarProps {
  onOpenLogin: () => void;
  whatsappUrl: string;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  onOpenLogin,
  whatsappUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços & Especialidades', href: '#servicos' },
    { label: 'Tratamentos Manipulativos', href: '#manipulativos' },
    { label: 'Guia de Patologias', href: '#patologias' },
    { label: 'A Equipe', href: '#equipe' },
    { label: 'Blog & Dicas', href: '#blog' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Convênios & Contato', href: '#contato' },
  ];

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#0b2b68] text-white py-2 px-4 text-xs font-semibold border-b border-blue-900 shadow-xs relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#dc2626] animate-pulse ring-2 ring-red-400/40 shrink-0" />
            <span>
              Referência em Coluna & Hérnia de Disco em {CLINIC_INFO.cityState} • Atendimento com Hora Marcada a partir das <strong className="text-amber-300 font-bold">07:30</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${CLINIC_INFO.landlinePhone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-1 text-blue-200 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-red-400" />
              <span>Fixo: {CLINIC_INFO.landlinePhone}</span>
            </a>
            <span className="text-blue-400 hidden sm:inline">•</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-200 hover:text-white font-bold transition-colors"
            >
              <MessageCircle className="h-3 w-3 text-emerald-400" />
              <span>WhatsApp: {CLINIC_INFO.whatsappPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 shrink-0 group">
            <ClinicLogo variant="header" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-[12px] font-bold text-slate-700 tracking-wide uppercase">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[#0f3e8f] transition-colors py-1 border-b-2 border-transparent hover:border-[#0f3e8f]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Team Access */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition-all border border-slate-300 shadow-2xs cursor-pointer"
              title="Acesso Restrito ao Sistema Clínico da Equipe"
            >
              <Lock className="h-3.5 w-3.5 text-[#0f3e8f]" />
              <span className="hidden sm:inline">Acesso Equipe</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#0f3e8f] hover:bg-[#0c2f6d] active:scale-95 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-blue-900/20 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span className="hidden sm:inline">Agendar Avaliação</span>
              <span className="sm:hidden">Agendar</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fade-in space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-[#0f3e8f] transition-all"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold px-2">
                <Clock className="h-4 w-4 text-[#0f3e8f]" />
                <span>{CLINIC_INFO.hoursWeekday}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold px-2">
                <MapPin className="h-4 w-4 text-[#dc2626]" />
                <span>{CLINIC_INFO.address}</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
