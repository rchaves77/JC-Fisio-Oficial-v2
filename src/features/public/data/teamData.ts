export interface TeamMember {
  id: string;
  name: string;
  role: string;
  crefito: string;
  specialties: string[];
  bio: string;
  experience: string;
  imageUrl: string;
  isLead?: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dr-jucelino',
    name: 'Dr. Jucelino Castro',
    role: 'Diretor Clínico & Fisioterapeuta Responsável',
    crefito: 'CREFITO-11 / Registro Ativo',
    specialties: [
      'Especialista em Coluna Vertebral & Hérnia de Disco',
      'Quiropraxia Clínica & Osteopatia',
      'Descompressão Discal Não-Cirúrgica',
      'RPG & Reabilitação Postural Global',
    ],
    bio: 'Pioneiro e maior referência em tratamento conservador de coluna no Acre. Ao longo de mais de 15 anos de dedicação exclusiva, já reabilitou mais de 43.000 pacientes sem necessidade de cirurgias, desenvolvendo um método próprio que combina diagnóstico mecânico rigoroso, ajustes manuais precisos e fortalecimento do core.',
    experience: '15+ anos de prática clínica',
    imageUrl: '/jucelino.png',
    isLead: true,
  },
  {
    id: 'dra-reabilitacao',
    name: 'Dra. Camila Vasconcelos',
    role: 'Fisioterapeuta Ortopédica & Traumato-Desportiva',
    crefito: 'CREFITO-11 / 28490-F',
    specialties: [
      'Reabilitação de Joelho (Gonartrose & Menisco)',
      'Fisioterapia Pós-Fratura & Pós-Cirúrgica',
      'Tendinopatias & Fascite Plantar',
      'Cinesioterapia Avançada',
    ],
    bio: 'Especializada no restabelecimento biomecânico de membros inferiores e superiores. Foco em recuperação acelerada pós-fratura, condromalácia, lesões de menisco e alívio de tendinites com protocolos baseados em evidência científica.',
    experience: '8 anos de experiência',
    imageUrl: '/dra-camila.png',
  },
  {
    id: 'dr-quiropraxia',
    name: 'Dr. Marcos Aurélio Rocha',
    role: 'Fisioterapeuta & Instrutor de Pilates Clínico',
    crefito: 'CREFITO-11 / 31920-F',
    specialties: [
      'Pilates Clínico & Estabilização Segmentar',
      'Tratamento de Manguito Rotador & Túnel do Carpo',
      'Manejo de Lipedema & Drenagem Funcional',
      'Reeducação Postural de Escoliose',
    ],
    bio: 'Responsável pelo estúdio de Pilates Clínico e fortalecimento postural. Atua na proteção das articulações contra o desgaste e na reabilitação muscular de pacientes com dor crônica, lipedema e lesões desportivas.',
    experience: '7 anos de experiência',
    imageUrl: '/dr-marcos.png',
  },
];

export const CLINIC_VALUES = [
  {
    title: 'Diagnóstico na Causa Real',
    desc: 'Não tratamos apenas o sintoma ou a dor momentânea. Avaliamos a biomecânica global para eliminar o pinçamento ou sobrecarga.',
    icon: 'Search',
  },
  {
    title: 'Método 100% Conservador',
    desc: 'Mais de 95% dos pacientes com hérnia de disco e lesões articulares evitam cirurgias com nossos protocolos manuais e mecânicos.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Hora Marcada & Sem Espera',
    desc: 'Respeito absoluto ao seu tempo. Atendimento individualizado com hora agendada a partir das 07:30 da manhã.',
    icon: 'Clock',
  },
  {
    title: 'Estrutura Completa & Acessível',
    desc: 'Salas privativas de atendimento, estúdio de Pilates Clínico e acessibilidade completa em Rio Branco.',
    icon: 'Building2',
  },
];
