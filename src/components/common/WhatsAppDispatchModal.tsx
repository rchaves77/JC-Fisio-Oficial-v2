import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Send, Monitor, Globe, Smartphone, Check, Copy, UserCheck, Star, Calendar, FileText, ExternalLink, Sun, Clock } from 'lucide-react';
import { Patient } from '../../types';
import { GOOGLE_REVIEW_LINK } from './GoogleReviewModal';
import { formatPhone } from '../../utils/masks';

interface WhatsAppDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients?: Patient[];
  initialPatient?: Patient | null;
  initialPhone?: string;
  initialMessage?: string;
}

export type WhatsAppMode = 'windows' | 'web' | 'universal';

export const WhatsAppDispatchModal: React.FC<WhatsAppDispatchModalProps> = ({
  isOpen,
  onClose,
  patients = [],
  initialPatient = null,
  initialPhone = '',
  initialMessage = '',
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(initialPatient?.id || '');
  const [customPhone, setCustomPhone] = useState<string>(formatPhone(initialPhone || initialPatient?.phone || ''));
  const [customName, setCustomName] = useState<string>(initialPatient?.name || '');
  
  // Preferred dispatch mode saved in localStorage
  const [sendMode, setSendMode] = useState<WhatsAppMode>(() => {
    return (localStorage.getItem('jc_wa_send_mode') as WhatsAppMode) || 'windows';
  });

  const [messageTemplate, setMessageTemplate] = useState<'lembrete' | 'sabado_segunda' | 'google_review' | 'exercicios' | 'custom'>('lembrete');
  const [messageText, setMessageText] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('segunda-feira (Manhã/Tarde)');
  const [copied, setCopied] = useState(false);

  // Sync when initialPatient changes
  useEffect(() => {
    if (initialPatient) {
      setSelectedPatientId(initialPatient.id);
      setCustomPhone(formatPhone(initialPatient.phone));
      setCustomName(initialPatient.name);
    } else if (initialPhone) {
      setCustomPhone(formatPhone(initialPhone));
    }
  }, [initialPatient, initialPhone]);

  // Update send mode preference
  const handleModeChange = (mode: WhatsAppMode) => {
    setSendMode(mode);
    localStorage.setItem('jc_wa_send_mode', mode);
  };

  // Handle patient selection change
  const handlePatientSelect = (pId: string) => {
    setSelectedPatientId(pId);
    if (!pId) {
      return;
    }
    const found = patients.find((p) => p.id === pId);
    if (found) {
      setCustomPhone(formatPhone(found.phone));
      setCustomName(found.name);
    }
  };

  // Auto-generate message text based on template and name
  useEffect(() => {
    if (initialMessage && messageTemplate === 'custom') {
      return;
    }

    const nameToUse = customName ? customName.split(' ')[0] : 'Paciente';

    if (messageTemplate === 'lembrete') {
      setMessageText(
        `Olá, ${nameToUse}! 🩺 Passando para confirmar a sua consulta de Fisioterapia na JC Fisioterapia agendada para ${appointmentDate}.\n\nPodemos confirmar a sua presença? Por favor, responda com SIM ou nos avise se precisar remarcar. Obrigado!`
      );
    } else if (messageTemplate === 'sabado_segunda') {
      setMessageText(
        `Olá, ${nameToUse}! ☀️ Lembrete de Sábado: passando para confirmar a sua consulta de Fisioterapia para Segunda-feira (${appointmentDate}).\n\nPodemos confirmar sua presença para a sessão da Segunda (Manhã/Tarde)? Responda com SIM para garantirmos seu horário. Obrigado!`
      );
    } else if (messageTemplate === 'google_review') {
      setMessageText(
        `Olá, ${nameToUse}! Tudo bem? Gostaria de saber como foi seu atendimento e tratamento na JC Fisioterapia.\n\nPoderia avaliar nosso atendimento no Google?\nLink: ${GOOGLE_REVIEW_LINK}`
      );
    } else if (messageTemplate === 'exercicios') {
      setMessageText(
        `Olá, ${nameToUse}! 🏃‍♂️ Lembrete do seu fisioterapeuta: lembre-se de realizar a sua série de exercícios prescritos hoje para acelerar sua recuperação.\n\nQualquer dúvida no envio da postura, nos chame aqui!`
      );
    } else if (messageTemplate === 'custom' && !messageText) {
      setMessageText(`Olá, ${nameToUse}! `);
    }
  }, [messageTemplate, customName, appointmentDate]);

  if (!isOpen) return null;

  // Clean phone string to digits only for URL
  const cleanPhoneDigits = (phoneStr: string) => {
    const rawDigits = phoneStr.replace(/\D/g, '');
    if (!rawDigits) return '';
    // If it doesn't start with country code (55 for Brazil), prepend 55
    if (rawDigits.length === 10 || rawDigits.length === 11) {
      return `55${rawDigits}`;
    }
    return rawDigits;
  };

  const formattedPhoneDigits = cleanPhoneDigits(customPhone);
  const encodedText = encodeURIComponent(messageText);

  // Generate target URL according to mode
  const getWhatsAppUrl = () => {
    if (!formattedPhoneDigits) return '#';

    if (sendMode === 'windows') {
      // Protocol link to launch native Windows WhatsApp App directly
      return `whatsapp://send?phone=${formattedPhoneDigits}&text=${encodedText}`;
    } else if (sendMode === 'web') {
      // Direct WhatsApp Web client URL
      return `https://web.whatsapp.com/send?phone=${formattedPhoneDigits}&text=${encodedText}`;
    } else {
      // Universal redirect link (wa.me)
      return `https://wa.me/${formattedPhoneDigits}?text=${encodedText}`;
    }
  };

  const finalUrl = getWhatsAppUrl();

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    if (!formattedPhoneDigits) {
      alert('Por favor, informe ou selecione um telefone válido com DDD.');
      return;
    }
    
    // For windows protocol link, window.open or window.location works seamlessly
    if (sendMode === 'windows') {
      window.location.href = finalUrl;
    } else {
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 text-slate-100 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <MessageSquare className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Disparador WhatsApp
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  Direto
                </span>
              </h2>
              <p className="text-xs text-slate-400">Envie mensagens via App do Windows ou WhatsApp Web em 1 clique</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Send Mode Selector (Windows App vs Web vs Universal) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Como deseja abrir o WhatsApp?</span>
            <span className="text-[11px] text-slate-400 font-normal">Sua preferência fica salva</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleModeChange('windows')}
              className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                sendMode === 'windows'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Monitor className="h-5 w-5 text-emerald-400" />
              <span>App Windows</span>
              <span className="text-[9px] font-normal text-slate-400">Aplicativo Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('web')}
              className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                sendMode === 'web'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Globe className="h-5 w-5 text-cyan-400" />
              <span>WhatsApp Web</span>
              <span className="text-[9px] font-normal text-slate-400">Navegador (web)</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('universal')}
              className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                sendMode === 'universal'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Smartphone className="h-5 w-5 text-amber-400" />
              <span>Universal (wa.me)</span>
              <span className="text-[9px] font-normal text-slate-400">Celular / Link rápido</span>
            </button>
          </div>
        </div>

        {/* Patient Selection & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Selecionar Paciente Cadastrado
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => handlePatientSelect(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-2.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="">-- Inserir Número Manualmente --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.phone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Telefone com DDD (WhatsApp)
            </label>
            <input
              type="text"
              placeholder="(61) 9 9999-8888"
              value={customPhone}
              onChange={(e) => {
                setCustomPhone(formatPhone(e.target.value));
                if (selectedPatientId) setSelectedPatientId('');
              }}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-2.5 text-xs font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Name Customization (if typing manually) */}
        {!selectedPatientId && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nome do Destinatário (para personalizar a mensagem)
            </label>
            <input
              type="text"
              placeholder="Ex: Maria Santos"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        )}

        {/* Template Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Modelo de Mensagem Pronta
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              type="button"
              onClick={() => setMessageTemplate('lembrete')}
              className={`p-2 rounded-xl border text-xs font-medium text-left flex items-center gap-1.5 transition-colors ${
                messageTemplate === 'lembrete'
                  ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 shrink-0 text-teal-400" />
              <span className="truncate">Confirmar Consulta</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMessageTemplate('sabado_segunda');
                setAppointmentDate('Segunda-feira (Manhã e Tarde)');
              }}
              className={`p-2 rounded-xl border text-xs font-medium text-left flex items-center gap-1.5 transition-colors ${
                messageTemplate === 'sabado_segunda'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold ring-1 ring-amber-500'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Confirmar consultas de Segunda (Manhã e Tarde) no Sábado"
            >
              <Sun className="h-3.5 w-3.5 shrink-0 text-amber-400 animate-pulse" />
              <span className="truncate">Sábado (Confirmar Segunda)</span>
            </button>

            <button
              type="button"
              onClick={() => setMessageTemplate('google_review')}
              className={`p-2 rounded-xl border text-xs font-medium text-left flex items-center gap-1.5 transition-colors ${
                messageTemplate === 'google_review'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span className="truncate">Avaliação Google</span>
            </button>

            <button
              type="button"
              onClick={() => setMessageTemplate('exercicios')}
              className={`p-2 rounded-xl border text-xs font-medium text-left flex items-center gap-1.5 transition-colors ${
                messageTemplate === 'exercicios'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <span className="truncate">Exercícios em Casa</span>
            </button>

            <button
              type="button"
              onClick={() => setMessageTemplate('custom')}
              className={`p-2 rounded-xl border text-xs font-medium text-left flex items-center gap-1.5 transition-colors ${
                messageTemplate === 'custom'
                  ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="h-3.5 w-3.5 shrink-0 text-purple-400" />
              <span className="truncate">Mensagem Livre</span>
            </button>
          </div>
        </div>

        {/* Date input helper if template is 'lembrete' or 'sabado_segunda' */}
        {(messageTemplate === 'lembrete' || messageTemplate === 'sabado_segunda') && (
          <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-800 space-y-1">
            <label className="block text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Clock className="h-3 w-3 text-emerald-400" />
              <span>Data/Turnos Agendados para Inserir na Mensagem:</span>
            </label>
            <input
              type="text"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              placeholder="Ex: Segunda-feira (Manhã e Tarde) às 08:30 / 14:00"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        )}

        {/* Textarea Preview & Editing */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-300">
              Conteúdo da Mensagem
            </label>
            <button
              onClick={handleCopyMessage}
              className="flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Texto copiado!' : 'Copiar texto'}</span>
            </button>
          </div>
          <textarea
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              Destino: <strong className="text-slate-200 font-mono">{formattedPhoneDigits || 'Nenhum informado'}</strong>
            </span>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            disabled={!formattedPhoneDigits}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="h-4 w-4 fill-slate-950" />
            <span>
              {sendMode === 'windows'
                ? 'Abrir no App do Windows'
                : sendMode === 'web'
                ? 'Abrir no WhatsApp Web'
                : 'Abrir via WhatsApp Universal'}
            </span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
