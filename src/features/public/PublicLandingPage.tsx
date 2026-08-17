import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Activity,
  Sparkles,
  Award,
  Users,
  Clock,
  HeartPulse,
  UserCheck,
  Building2,
  ArrowUp,
  Lock,
  Stethoscope,
  ExternalLink,
  Check,
  Star,
} from 'lucide-react';
import { ClinicLogo } from '../../components/common/ClinicLogo';

interface PublicLandingPageProps {
  onOpenLogin: () => void;
  onOpenBookingModal?: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onOpenLogin,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openMythIndex, setOpenMythIndex] = useState<number | null>(0);

  const whatsappPhone = '(68) 99244-9425';
  const whatsappRaw = '5568992449425';
  const defaultMessage = encodeURIComponent(
    'Olá! Vi o site da JC Fisioterapia e gostaria de agendar uma avaliação para tratar minhas dores.'
  );
  const whatsappUrl = `https://wa.me/${whatsappRaw}?text=${defaultMessage}`;

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const myths = [
    {
      myth: 'Quem tem diagnóstico de Hérnia de Disco precisa obrigatoriamente fazer cirurgia?',
      truth:
        'MITO! Mais de 95% dos pacientes com hérnia de disco (cervical, torácica ou lombar) se recuperam totalmente sem necessidade de cirurgia. Nossa metodologia descomprime as raízes nervosas e reabilita a coluna de forma conservadora e duradoura.',
    },
    {
      myth: 'Ficar em repouso absoluto na cama é a melhor solução para curar a dor na coluna?',
      truth:
        'MITO! O repouso prolongado enfraquece os músculos estabilizadores e aumenta a rigidez articular. O movimento direcionado, através da cinesioterapia e descompressão manual, ativa a circulação e acelera a regeneração muscular.',
    },
    {
      myth: 'Remédios e injeções fortes resolvem o problema definitivo da hérnia de disco?',
      truth:
        'MITO! Medicamentos e anti-inflamatórios apenas silenciam os sintomas temporariamente. Eles não removem a pressão mecânica sobre o disco e nervo. É necessário tratar a causa biomecânica do problema.',
    },
    {
      myth: 'Quem sente dores nas costas não pode mais praticar exercícios físicos nem Pilates?',
      truth:
        'MITO! O Estúdio de Pilates Clínico e os exercícios orientados por fisioterapeutas fortalecem o core e protegem a coluna contra novas crises, permitindo retornar a uma rotina ativa e sem restrições.',
    },
  ];

  const services = [
    {
      title: 'Tratamento de Hérnia de Disco',
      desc: 'Atendimento especializado para hérnias cervicais, torácicas e lombares sem cirurgia.',
      badge: 'Especialidade Principal',
      icon: HeartPulse,
    },
    {
      title: 'Alívio de Dores na Coluna & Ciático',
      desc: 'Combate à inflamação, queimação, formigamento e pontadas recorrentes nas costas e pernas.',
      badge: 'Alívio Rápido',
      icon: Activity,
    },
    {
      title: 'Serviço Ouro de Quiropraxia',
      desc: 'Realinhamento articular com técnicas manuais seguras e precisas para restabelecer a mobilidade.',
      badge: 'Serviço Ouro',
      icon: Sparkles,
    },
    {
      title: 'Terapias Manuais para Descompressão',
      desc: 'Métodos científicos para aliviar a pressão intra-discal e liberar raízes nervosas comprimidas.',
      badge: 'Sem Dor',
      icon: ShieldCheck,
    },
    {
      title: 'Reabilitação Postural & Funcional',
      desc: 'Correção de desvios posturais e reeducação dos padrões de movimento para evitar recidivas.',
      badge: 'Duradouro',
      icon: CheckCircle2,
    },
    {
      title: 'Estúdio de Pilates & Cinesioterapia',
      desc: 'Fortalecimento muscular especializado do core e proteção das articulações da coluna.',
      badge: 'Qualidade de Vida',
      icon: Stethoscope,
    },
  ];

  return (
    <div id="topo" className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-teal-700 text-teal-50 py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-xs">
        <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
        <span>Atendimento Especializado em Coluna e Hérnia de Disco • Hora Marcada em Rio Branco - AC</span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 font-bold text-amber-200 hover:text-white underline ml-2"
        >
          <span>WhatsApp: {whatsappPhone}</span>
        </a>
      </div>

      {/* Main Public Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <ClinicLogo variant="header" />
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#sobre" className="hover:text-teal-700 transition-colors">
              Sobre a Clínica
            </a>
            <a href="#metodo" className="hover:text-teal-700 transition-colors">
              Nosso Método
            </a>
            <a href="#servicos" className="hover:text-teal-700 transition-colors">
              Serviços Ouro
            </a>
            <a href="#mitos" className="hover:text-teal-700 transition-colors">
              Mitos & Verdades
            </a>
            <a href="#convenios" className="hover:text-teal-700 transition-colors">
              Convênios
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Header Login Button for Team/Staff Access */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all border border-slate-300 shadow-2xs"
              title="Acesso Restrito da Equipe e Fisioterapeutas"
            >
              <Lock className="h-3.5 w-3.5 text-teal-600" />
              <span className="hidden sm:inline">Acesso Equipe</span>
            </button>

            {/* Header WhatsApp Direct Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 px-4 py-2 text-xs font-bold text-white transition-all shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span className="hidden sm:inline">Agendar no WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="sobre" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 border border-teal-200 px-4 py-1.5 text-xs font-bold text-teal-800 shadow-2xs">
                <Award className="h-4 w-4 text-amber-600" />
                <span>Mais de 43 Mil Pacientes Atendidos Sem Cirurgia</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Sofre com dores na coluna ou diagnóstico de{' '}
                <span className="text-teal-700 underline decoration-teal-400/60">
                  hérnia de disco?
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                A clínica <strong className="text-slate-900 font-bold">Jucelino Castro Fisioterapia</strong> é a principal referência no tratamento de hérnia de disco e disfunções da coluna vertebral em Rio Branco. Com uma metodologia de excelência e foco na <strong className="text-teal-800 font-bold">reabilitação sem cirurgia</strong>, já ajudamos mais de 43 mil pacientes a recuperarem a sua qualidade de vida, mobilidade e o prazer de viver sem dor.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Oferecemos um atendimento humanizado, especializado e baseado em evidências científicas para tratar a <strong className="text-slate-800 font-semibold">causa real do seu problema</strong>. Agende sua avaliação e dê o primeiro passo para uma vida sem limitações. Atendimento com hora marcada.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-4 text-sm font-bold text-white transition-all shadow-xl shadow-emerald-600/20 active:scale-98"
                >
                  <MessageCircle className="h-5 w-5 fill-white" />
                  <span>Agendar Avaliação no WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 font-semibold py-2 sm:py-0">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>Atendimento com Hora Marcada</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-teal-700">43.000+</div>
                  <div className="text-[11px] text-slate-600 font-semibold">Pacientes Atendidos</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-700">100%</div>
                  <div className="text-[11px] text-slate-600 font-semibold">Sem Cirurgia</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-600">Serviço Ouro</div>
                  <div className="text-[11px] text-slate-600 font-semibold">Quiropraxia & Pilates</div>
                </div>
              </div>

            </div>

            {/* Right Feature Highlight Box */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold uppercase tracking-wider">
                    Sintomas de Alerta
                  </span>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                    Sofre com dores na Cervical, Ombros e Braços?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dores no pescoço, cervical que irradia para os braços, sensação de formigamento ou queimação intensa?
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold leading-relaxed">
                  ⚠️ Enquanto você não tratar a <strong>CAUSA DA DOR</strong>, as suas dores não melhorarão.
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tratamento comprovado, sem cirurgia e sem uso contínuo de medicamentos</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Avaliação funcional completa para descompressão de raízes nervosas</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Atendimento especializado com Dr. Jucelino Castro e equipe</span>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-xl bg-teal-700 hover:bg-teal-600 py-3 text-xs font-bold text-white transition-all shadow-md"
                >
                  Falar Diretamente com Fisioterapeuta
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Method Section */}
      <section id="metodo" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-teal-700 uppercase tracking-widest">
              Metodologia de Excelência
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Principais Características do Nosso Método de Tratamento
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Desenvolvido para eliminar a dor na origem, restaurar a mobilidade articular e garantir autonomia aos nossos pacientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-6 space-y-3 hover:border-teal-300 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-2xs">
                <HeartPulse className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Foco na Causa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identifica e trata a origem da dor, não apenas os sintomas, descomprimindo raízes nervosas afetadas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 space-y-3 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Resultados Rápidos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Promete alívio perceptível e melhora funcional já na primeira sessão, com ausência de dor em poucos dias para muitos pacientes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 space-y-3 hover:border-amber-300 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-2xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Movimentos Precisos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utiliza movimentos leves e direcionados para aliviar a compressão articular e realinhar a coluna.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 space-y-3 hover:border-sky-300 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-2xs">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Autocuidado & Autonomia</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensina o paciente a reconhecer e corrigir posturas e movimentos que causam dor, promovendo total independência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">
              Cuidados Integrados de Saúde
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Nossos Serviços Especializados
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tratamento Ouro em Quiropraxia, Cinesioterapia e Pilates para recuperação sem cirurgia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-4 hover:border-teal-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-2 flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
                  >
                    <span>Consultar Horários</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Myths vs Truths Section */}
      <section id="mitos" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest">
              Informação Científica sem Tabus
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Mitos & Verdades Sobre Hérnia de Disco e Coluna
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tire suas dúvidas e entenda por que tantas pessoas evitam cirurgias com o tratamento correto.
            </p>
          </div>

          <div className="space-y-4">
            {myths.map((item, index) => {
              const isOpen = openMythIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenMythIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-teal-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-amber-600 shrink-0" />
                      <span>{item.myth}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-700 border-t border-slate-200/80 bg-white leading-relaxed space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                        Verdade Científica
                      </span>
                      <p>{item.truth}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-xs font-bold text-white transition-all shadow-md"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>Tirar Dúvidas Direto no WhatsApp: {whatsappPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Health Insurance & Convenios Section */}
      <section id="convenios" className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Convênios Aceitos & Reembolso</h3>
            <p className="text-xs text-slate-600">
              Facilidade de atendimento com planos conveniados e emissão de recibo para reembolso particular.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-3.5 shadow-2xs">
              <Building2 className="h-6 w-6 text-teal-700 shrink-0" />
              <div className="text-left">
                <div className="font-black text-slate-900 text-sm">CASSI</div>
                <div className="text-[10px] text-slate-500 font-medium">Caixa de Assistência</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-3.5 shadow-2xs">
              <ShieldCheck className="h-6 w-6 text-emerald-700 shrink-0" />
              <div className="text-left">
                <div className="font-black text-slate-900 text-sm">FuSEx</div>
                <div className="text-[10px] text-slate-500 font-medium">Fundo de Saúde do Exército</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-3.5 shadow-2xs">
              <ShieldCheck className="h-6 w-6 text-rose-700 shrink-0" />
              <div className="text-left">
                <div className="font-black text-slate-900 text-sm">Corpo de Bombeiros</div>
                <div className="text-[10px] text-slate-500 font-medium">CBMAC / Polícia Militar</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-3.5 shadow-2xs">
              <Building2 className="h-6 w-6 text-sky-700 shrink-0" />
              <div className="text-left">
                <div className="font-black text-slate-900 text-sm">GEAP Saúde</div>
                <div className="text-[10px] text-slate-500 font-medium">Autogestão em Saúde</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-3.5 shadow-2xs">
              <Check className="h-6 w-6 text-amber-600 shrink-0" />
              <div className="text-left">
                <div className="font-black text-slate-900 text-sm">Recibo para Reembolso</div>
                <div className="text-[10px] text-slate-500 font-medium">Para Outros Convênios</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-12 w-12 rounded-full bg-teal-700 hover:bg-teal-600 text-white shadow-2xl active:scale-95 transition-all border border-teal-500/40"
          title="Voltar para o Topo"
          aria-label="Voltar para o topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Floating Sticky WhatsApp Quick Action (Bottom Left) - Only shown when scrolling down */}
      {showBackToTop && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-xs font-bold text-white shadow-2xl active:scale-95 transition-all border border-emerald-400 animate-fade-in"
        >
          <MessageCircle className="h-5 w-5 fill-white" />
          <span className="hidden sm:inline">WhatsApp: {whatsappPhone}</span>
        </a>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-10 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <ClinicLogo variant="header" />
            
            <div className="flex items-center gap-4 text-xs font-medium">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                WhatsApp: {whatsappPhone}
              </a>
              <span>•</span>
              <button onClick={onOpenLogin} className="text-teal-400 hover:text-teal-300 font-bold underline">
                Acesso do Colaborador
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} Clínica Jucelino Castro Fisioterapia. Todos os direitos reservados.</p>
            <p>Especialista em Coluna, Quiropraxia, Cinesioterapia & Pilates em Rio Branco - AC</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
