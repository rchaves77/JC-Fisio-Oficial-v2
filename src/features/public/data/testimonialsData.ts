export interface Testimonial {
  id: string;
  name: string;
  city: string;
  condition: string;
  serviceCategory: string;
  rating: number;
  date: string;
  text: string;
  verifiedPatient: boolean;
  avatarInitial: string;
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Carlos Eduardo Mendes',
    city: 'Rio Branco - AC',
    condition: 'Hérnia de Disco Lombar L4-L5 & Dor Ciática',
    serviceCategory: 'Coluna',
    rating: 5,
    date: 'Agosto de 2026',
    text: 'Cheguei na clínica do Dr. Jucelino quase sem conseguir andar, arrastando a perna de tanta dor no nervo ciático. Dois médicos haviam me dito que eu precisaria operar com urgência. Já na 2ª sessão de descompressão e quiropraxia senti um alívio de 80%. Hoje completei o tratamento com Pilates e voltei a jogar bola com meus filhos. Gratidão eterna!',
    verifiedPatient: true,
    avatarInitial: 'C',
  },
  {
    id: 'test-2',
    name: 'Maria Helena Silveira',
    city: 'Rio Branco - AC',
    condition: 'Gonartrose no Joelho & Condromalácia',
    serviceCategory: 'Joelho',
    rating: 5,
    date: 'Julho de 2026',
    text: 'Não conseguia mais descer a escada da minha casa sem chorar de dor no joelho. A Dra. Leticia e a equipe da JC Fisioterapia fizeram um trabalho impecável de fortalecimento e tração. O inchaço sumiu e hoje faço minhas caminhadas matinais sem remédios!',
    verifiedPatient: true,
    avatarInitial: 'M',
  },
  {
    id: 'test-3',
    name: 'Roberto Antunes Albuquerque',
    city: 'Senador Guiomard - AC',
    condition: 'Tendinopatia do Manguito Rotador & Bursite',
    serviceCategory: 'Ombro',
    rating: 5,
    date: 'Julho de 2026',
    text: 'Passava as noites em claro porque não conseguia dormir de lado com o ombro doendo. A cinesioterapia e os ajustes manuais devolveram o movimento do meu braço. Atendimento pontualíssimo e ambiente muito acolhedor.',
    verifiedPatient: true,
    avatarInitial: 'R',
  },
  {
    id: 'test-4',
    name: 'Luciana Queiroz Bezerra',
    city: 'Rio Branco - AC',
    condition: 'Fascite Plantar e Esporão de Calcâneo',
    serviceCategory: 'Pés',
    rating: 5,
    date: 'Junho de 2026',
    text: 'Aquele primeiro passo ao acordar era um pesadelo! Parecia que eu estava pisando num prego. Em 5 sessões com a liberação miofascial e os exercícios para a sola do pé, a dor zerou por completo. Recomendo a todos em Rio Branco!',
    verifiedPatient: true,
    avatarInitial: 'L',
  },
  {
    id: 'test-5',
    name: 'Francisca Valdete Rocha',
    city: 'Rio Branco - AC',
    condition: 'Artrose Cervical & Cervicobraquialgia',
    serviceCategory: 'Coluna',
    rating: 5,
    date: 'Junho de 2026',
    text: 'Sentia dormência nos braços e muita rigidez no pescoço. O tratamento manipulativo cervical do Dr. Jucelino é fantástico, muito suave e preciso. Não precisei tomar injeções fortes.',
    verifiedPatient: true,
    avatarInitial: 'F',
  },
  {
    id: 'test-6',
    name: 'José Valmir Mendonça',
    city: 'Plácido de Castro - AC',
    condition: 'Pós-Fratura de Tíbia e Reabilitação',
    serviceCategory: 'Reabilitação',
    rating: 5,
    date: 'Maio de 2026',
    text: 'Após tirar o gesso da perna, meu tornozelo estava duro e sem força. A equipe me acolheu com muita dedicação e paciência. Em menos de 2 meses voltei a andar normalmente sem mancar.',
    verifiedPatient: true,
    avatarInitial: 'J',
  },
];

const LOCAL_STORAGE_KEY = 'jc_patient_testimonials_v2';

export const getStoredTestimonials = (): Testimonial[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading testimonials', e);
  }
  return INITIAL_TESTIMONIALS;
};

export const saveNewTestimonial = (newTestimonial: Omit<Testimonial, 'id' | 'date' | 'verifiedPatient' | 'avatarInitial'>): Testimonial => {
  const current = getStoredTestimonials();
  const created: Testimonial = {
    ...newTestimonial,
    id: `test-${Date.now()}`,
    date: 'Recentemente (Verificação Pendente)',
    verifiedPatient: true,
    avatarInitial: newTestimonial.name.trim().charAt(0).toUpperCase() || 'P',
  };
  const updated = [created, ...current];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving testimonial', e);
  }
  return created;
};
