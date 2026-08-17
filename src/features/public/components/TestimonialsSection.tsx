import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  PlusCircle,
  ExternalLink,
  Heart,
  MessageSquare,
} from 'lucide-react';
import { Testimonial } from '../data/testimonialsData';
import { CLINIC_INFO } from '../data/servicesData';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenNewTestimonialModal: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenNewTestimonialModal,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Coluna', 'Joelho', 'Ombro', 'Pés', 'Reabilitação'];

  const filtered = testimonials.filter((t) => {
    return filterCategory === 'all' || t.serviceCategory.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0f3e8f]">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span>Histórias Reais de Superação</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              O Que Nossos Pacientes Dizem
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Mais de 43 mil vidas transformadas em Rio Branco e em todo o Acre. Veja relatos de quem voltou a viver sem dor e sem cirurgias.
            </p>
          </div>

          {/* Action Buttons: Add Testimonial + Google Reviews Link */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewTestimonialModal}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0f3e8f] hover:bg-[#0c2f6d] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Deixar Meu Depoimento</span>
            </button>

            <a
              href="https://maps.google.com/?q=Jucelino+Castro+Fisioterapia+Rio+Branco+Acre"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span>Ver no Google (5.0 Estrelas)</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#0f3e8f] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'Todos os Depoimentos' : `Casos de ${cat}`}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 text-left relative"
            >
              <div className="space-y-3">
                
                {/* Rating & Verified */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    Paciente Verificado
                  </span>
                </div>

                {/* Condition Tag */}
                <div className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-[#0f3e8f] text-[11px] font-bold border border-blue-100">
                  {item.condition}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0f3e8f] text-white flex items-center justify-center font-black text-xs">
                    {item.avatarInitial}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500">{item.city} • {item.date}</div>
                  </div>
                </div>

                <Quote className="h-6 w-6 text-slate-200" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
