import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  ArrowUp,
  Phone,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PublicNavbar } from './components/PublicNavbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ManipulativeTreatmentsSection } from './components/ManipulativeTreatmentsSection';
import { PathologiesIndexSection } from './components/PathologiesIndexSection';
import { TeamSection } from './components/TeamSection';
import { BlogSection } from './components/BlogSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InsuranceAndContactSection } from './components/InsuranceAndContactSection';
import { PublicFooter } from './components/PublicFooter';

import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BlogPostModal } from './components/BlogPostModal';
import { NewTestimonialModal } from './components/NewTestimonialModal';
import { SymptomTriageModal } from './components/SymptomTriageModal';

import { SERVICES_LIST, ServiceItem, CLINIC_INFO } from './data/servicesData';
import { BlogPost } from './data/blogData';
import { getStoredTestimonials, Testimonial } from './data/testimonialsData';

interface PublicLandingPageProps {
  onOpenLogin: () => void;
  onOpenBookingModal?: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onOpenLogin,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getStoredTestimonials());

  const defaultMessage = encodeURIComponent(
    'Olá! Estava navegando no site da JC Fisioterapia e gostaria de agendar uma avaliação com o Dr. Jucelino Castro.'
  );
  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${defaultMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectServiceBySlug = (slug: string) => {
    const found = SERVICES_LIST.find((s) => s.slug === slug);
    if (found) {
      setSelectedService(found);
    }
  };

  const handleTestimonialAdded = (newTestimonial: Testimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="inicio" className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between pb-20 sm:pb-0">
      
      {/* 1. STICKY NAVBAR */}
      <PublicNavbar
        onOpenLogin={onOpenLogin}
        whatsappUrl={whatsappUrl}
      />

      {/* 2. HERO SECTION */}
      <HeroSection
        whatsappUrl={whatsappUrl}
        onOpenTriage={() => setIsTriageModalOpen(true)}
        onSelectServiceSlug={handleSelectServiceBySlug}
      />

      {/* 3. MANIPULATIVE TREATMENTS SECTION ("Tratamento manipulativo cervical/lombar/vertebral") */}
      <ManipulativeTreatmentsSection
        whatsappUrl={whatsappUrl}
      />

      {/* 4. SPECIALIZED SERVICES (10 CATEGORIES & PROTOCOLS) */}
      <ServicesSection
        onSelectService={(service) => setSelectedService(service)}
        whatsappUrl={whatsappUrl}
      />

      {/* 5. COMPLETE PATHOLOGIES INDEX (A-Z DIRECTORY) */}
      <PathologiesIndexSection
        onSelectService={(service) => setSelectedService(service)}
        whatsappUrl={whatsappUrl}
      />

      {/* 6. TEAM & CLINIC INFRASTRUCTURE */}
      <TeamSection
        whatsappUrl={whatsappUrl}
      />

      {/* 7. INTEGRATED PHYSIOTHERAPY BLOG */}
      <BlogSection
        onSelectPost={(post) => setSelectedPost(post)}
      />

      {/* 8. PATIENT TESTIMONIALS & REVIEWS */}
      <TestimonialsSection
        testimonials={testimonials}
        onOpenNewTestimonialModal={() => setIsTestimonialModalOpen(true)}
      />

      {/* 9. INSURANCES, CONTACT & FAQ */}
      <InsuranceAndContactSection
        whatsappUrl={whatsappUrl}
      />

      {/* 10. FOOTER */}
      <PublicFooter
        onOpenLogin={onOpenLogin}
        whatsappUrl={whatsappUrl}
      />

      {/* MOBILE STICKY BOTTOM BAR (Optimized for 80% mobile patients) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
        <a
          href={`tel:${CLINIC_INFO.landlinePhone.replace(/\D/g, '')}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 border border-slate-200 text-[11px] font-bold transition-all"
        >
          <Phone className="h-4 w-4 text-[#0f3e8f] mb-0.5" />
          <span>Ligar Fixo</span>
        </a>

        <button
          onClick={() => setIsTriageModalOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-blue-50 active:bg-blue-100 text-[#0f3e8f] border border-blue-200 text-[11px] font-bold transition-all"
        >
          <Sparkles className="h-4 w-4 text-[#dc2626] mb-0.5" />
          <span>Triagem Dor</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500 active:bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-950/20 transition-all"
        >
          <MessageCircle className="h-4 w-4 fill-white" />
          <span>WhatsApp Direto</span>
        </a>
      </div>

      {/* DESKTOP FLOATING WHATSAPP BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-3.5 text-xs font-bold text-white shadow-2xl shadow-emerald-950/40 hover:scale-105 transition-all group"
        title="Falar no WhatsApp com a equipe da clínica"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="h-5 w-5 fill-white" />
        <span className="font-black">Agendar no WhatsApp</span>
      </a>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 p-3 rounded-full bg-white/95 hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xl transition-all hover:scale-105 cursor-pointer backdrop-blur-sm"
          title="Voltar ao início da página"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#0f3e8f]" />
        </button>
      )}

      {/* MODALS */}

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        whatsappUrl={whatsappUrl}
      />

      {/* Blog Post Reader Modal */}
      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        whatsappUrl={whatsappUrl}
      />

      {/* New Testimonial Submission Modal */}
      <NewTestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        onTestimonialAdded={handleTestimonialAdded}
      />

      {/* Symptom Triage Modal */}
      <SymptomTriageModal
        isOpen={isTriageModalOpen}
        onClose={() => setIsTriageModalOpen(false)}
        onSelectService={(service) => setSelectedService(service)}
        whatsappUrl={whatsappUrl}
      />

    </div>
  );
};
