import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  FileText,
  ChevronDown,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { CLINIC_INFO } from '../data/servicesData';

interface InsuranceAndContactSectionProps {
  whatsappUrl: string;
}

export const InsuranceAndContactSection: React.FC<InsuranceAndContactSectionProps> = ({
  whatsappUrl,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const insurances = [
    { name: 'CASSI', desc: 'Convênio Banco do Brasil', badge: 'Atendimento Direto' },
    { name: 'FuSEx', desc: 'Fundo de Saúde do Exército', badge: 'Atendimento Direto' },
    { name: 'Polícia Militar / Bombeiros', desc: 'Convênio Forças de Segurança AC', badge: 'Atendimento Direto' },
    { name: 'GEAP Saúde', desc: 'Fundação de Seguridade Social', badge: 'Atendimento Direto' },
    { name: 'Reembolso com Laudo', desc: 'Bradesco, SulAmérica, Unimed, Amil e outros', badge: 'Emitimos Nota & Laudo' },
  ];

  const faqs = [
    {
      q: 'Preciso de encaminhamento médico para iniciar a fisioterapia?',
      a: 'Não é obrigatório para consultas particulares ou avaliação biomecânica inicial. O fisioterapeuta é um profissional de primeiro contato habilitado a diagnosticar disfunções cinético-funcionais. Para convênios com cobertura direta, o pedido médico pode ser solicitado pelas operadoras.',
    },
    {
      q: 'Quantas sessões costumam ser necessárias para aliviar a hérnia de disco?',
      a: 'Com as técnicas de tratamento manipulativo e descompressão, a maioria dos pacientes relata alívio significativo da dor já entre a 2ª e a 5ª sessão. O ciclo completo inclui o fortalecimento estabilizador para evitar que a dor retorne.',
    },
    {
      q: 'Qual o horário de atendimento da clínica?',
      a: 'Atendemos de Segunda a Sexta-feira, das 07:30 às 19:00, e aos Sábados das 08:00 às 12:00, sempre com horário marcado para evitar filas e garantir atendimento exclusivo.',
    },
    {
      q: 'Como funciona o sistema de reembolso para outros convênios?',
      a: 'Fornecemos recibo oficial com CNPJ, número de CREFITO do fisioterapeuta, laudo detalhado e relatório de evolução clínica com todos os códigos necessários para que você solicite o reembolso integral ou parcial junto ao seu plano.',
    },
  ];

  return (
    <section id="contato" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Insurance Section */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-bold text-[#0f3e8f]">
              <CreditCard className="h-4 w-4 text-[#dc2626]" />
              <span>Facilidades de Atendimento</span>
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Convênios Atendidos & Sistema de Reembolso
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Aceitamos os principais convênios de Rio Branco/AC e oferecemos suporte documental completo para reembolso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {insurances.map((ins, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/60 hover:border-blue-300 transition-all text-center space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="text-base font-black text-[#0f3e8f]">{ins.name}</div>
                  <div className="text-xs text-slate-600 leading-tight">{ins.desc}</div>
                </div>
                <div className="pt-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[#dc2626] text-[10px] font-bold border border-slate-200 shadow-2xs">
                    {ins.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Map Box + FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-200">
          
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0f3e8f] uppercase tracking-wider">
                Canais de Atendimento
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Agende Sua Avaliação na JC Fisioterapia
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nossa equipe está pronta para responder suas dúvidas sobre tratamentos e horários disponíveis.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Landline */}
              <a
                href={`tel:${CLINIC_INFO.landlinePhone.replace(/\D/g, '')}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0f3e8f] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0f3e8f] flex items-center justify-center shrink-0 group-hover:bg-[#0f3e8f] group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold">Telefone Fixo da Clínica</div>
                  <div className="text-sm font-black text-slate-900">{CLINIC_INFO.landlinePhone}</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-500 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 fill-white" />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-800 font-semibold">WhatsApp Direto</div>
                  <div className="text-sm font-black text-emerald-950">{CLINIC_INFO.whatsappPhone}</div>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold">Localização</div>
                  <div className="text-xs font-bold text-slate-900">{CLINIC_INFO.address}</div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold">Horário de Funcionamento</div>
                  <div className="text-xs font-bold text-slate-900">{CLINIC_INFO.hoursWeekday}</div>
                  <div className="text-[10px] text-slate-500">{CLINIC_INFO.hoursSaturday}</div>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 text-center rounded-2xl bg-[#0f3e8f] hover:bg-[#0c2f6d] text-white font-bold text-xs shadow-lg transition-all"
            >
              Falar com a Recepção no WhatsApp
            </a>
          </div>

          {/* Right: Interactive FAQ */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold text-[#dc2626] uppercase tracking-wider">
                Dúvidas Frequentes
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Perguntas e Respostas Rápidas
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#0f3e8f] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform text-slate-400 ${
                        openFaq === index ? 'rotate-180 text-[#0f3e8f]' : ''
                      }`}
                    />
                  </button>

                  {openFaq === index && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Google Rating Verification Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 flex items-center justify-between gap-4 mt-6">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900">
                  Avaliado com Nota Máxima no Google
                </div>
                <div className="text-[11px] text-slate-600">
                  5.0 estrelas com base em mais de 180 avaliações de pacientes verificados.
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Jucelino+Castro+Fisioterapia+Rio+Branco+Acre"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shrink-0"
              >
                Conferir
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
