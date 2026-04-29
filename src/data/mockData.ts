export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  description?: string;
  date: string;
  category: string;
  mainImage?: string;
  galleryImages?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  isPast: boolean;
  mainImage?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Requalificação do Parque Central Aprovada",
    excerpt:
      "A Junta aprovou o projeto de requalificação do parque central, com novas áreas verdes e equipamentos de lazer.",
    description:
      "Após consulta pública, foi aprovado o plano final de intervenção no Parque Central. A proposta inclui novas zonas de sombra, equipamentos infantis inclusivos, melhoria da iluminação e percursos pedonais acessíveis. Durante os próximos meses serão divulgadas fases de obra e condicionamentos temporários.",
    date: "2026-04-07",
    category: "Obras",
    mainImage: "/hero-bg.jpg",
    galleryImages: [
      "/hero-bg.jpg",
      "/Casa da Comunidade Sustentável.jpg",
      "/presidente.jpg",
      "/Sede - Mudança Provisória de Instalações.webp",
      "/ufgvc flag.png",
      "/ufgvc logo.png",
      "/hero-bg.jpg",
      "/Casa da Comunidade Sustentável.jpg",
      "/presidente.jpg",
    ],
  },
  {
    id: "2",
    title: "Inscrições Abertas para Atividades de Verão",
    excerpt:
      "Estão abertas as inscrições para as atividades desportivas e culturais de verão destinadas a todas as idades.",
    description:
      "As atividades decorrem entre junho e setembro e incluem oficinas criativas, sessões de leitura ao ar livre, modalidades desportivas e ações para famílias. As vagas são limitadas e a prioridade é dada a residentes da freguesia.",
    date: "2026-04-05",
    category: "Atividades",
    mainImage: "/hero-bg.jpg",
    galleryImages: ["/hero-bg.jpg"],
  },
  {
    id: "3",
    title: "Novo Horário de Atendimento ao Público",
    excerpt:
      "A partir de maio, o atendimento ao público passará a funcionar em horário alargado às quartas-feiras.",
    description:
      "Com o objetivo de melhorar a acessibilidade dos serviços, a Junta irá alargar o horário à quarta-feira até às 19h00. Recomenda-se marcação prévia para serviços com maior procura.",
    date: "2026-04-02",
    category: "Avisos",
    mainImage: "/hero-bg.jpg",
    galleryImages: ["/hero-bg.jpg", "/hero-bg.jpg", "/hero-bg.jpg"],
  },
  {
    id: "4",
    title: "Campanha de Limpeza Comunitária",
    excerpt:
      "Junte-se à campanha de limpeza comunitária no próximo sábado. Voluntários são bem-vindos!",
    description:
      "A iniciativa inclui recolha de resíduos em vários pontos da freguesia, com apoio de equipas locais e distribuição de materiais de proteção. A participação é gratuita mediante inscrição.",
    date: "2026-03-28",
    category: "Eventos",
    mainImage: "/hero-bg.jpg",
    galleryImages: ["/hero-bg.jpg", "/hero-bg.jpg"],
  },
];

export const eventItems: EventItem[] = [
  {
    id: "1",
    title: "Festa da Primavera",
    description:
      "Celebração anual com música ao vivo, gastronomia local e atividades para toda a família.",
    date: "2026-04-20",
    time: "10:00 - 22:00",
    location: "Praça Central",
    category: "Cultural",
    isPast: false,
    mainImage: "/hero-bg.jpg",
  },
  {
    id: "2",
    title: "Sessão de Esclarecimento – Orçamento Participativo",
    description: "Apresentação dos projetos candidatos ao orçamento participativo 2026.",
    date: "2026-04-25",
    time: "18:30 - 20:00",
    location: "Auditório da Junta",
    category: "Institucional",
    isPast: false,
    mainImage: "/Casa da Comunidade Sustentável.jpg",
  },
  {
    id: "3",
    title: "Torneio de Futsal Interfreguesias",
    description: "Torneio desportivo entre freguesias vizinhas.",
    date: "2026-05-03",
    time: "09:00 - 18:00",
    location: "Pavilhão Desportivo",
    category: "Desporto",
    isPast: false,
    mainImage: "/presidente.jpg",
  },
  {
    id: "4",
    title: "Workshop de Jardinagem Urbana",
    description: "Aprenda técnicas de jardinagem para espaços pequenos.",
    date: "2026-05-10",
    time: "14:00 - 17:00",
    location: "Centro Comunitário",
    category: "Formação",
    isPast: false,
    mainImage: "/Sede - Mudança Provisória de Instalações.webp",
  },
  {
    id: "5",
    title: "Reunião de Assembleia de Freguesia",
    description: "Reunião ordinária da Assembleia de Freguesia aberta ao público.",
    date: "2026-03-15",
    time: "18:00 - 20:00",
    location: "Sede da Junta",
    category: "Institucional",
    isPast: true,
    mainImage: "/ufgvc flag.png",
  },
  {
    id: "6",
    title: "Feira de Artesanato Local",
    description: "Mostra de artesanato e produtos regionais.",
    date: "2026-03-01",
    time: "10:00 - 18:00",
    location: "Largo da Igreja",
    category: "Cultural",
    isPast: true,
    mainImage: "/ufgvc logo.png",
  },
  {
    id: "7",
    title: "Cinema ao Ar Livre",
    description: "Sessão de cinema ao ar livre com exibição de filmes para toda a família.",
    date: "2026-05-18",
    time: "21:00 - 23:30",
    location: "Parque Central",
    category: "Cultural",
    isPast: false,
    mainImage: "/hero-bg.jpg",
  },
  {
    id: "8",
    title: "Aula Aberta de Yoga no Parque",
    description: "Sessão gratuita de yoga para todos os níveis, com instrutor certificado.",
    date: "2026-05-22",
    time: "08:00 - 09:30",
    location: "Jardim Municipal",
    category: "Desporto",
    isPast: false,
    mainImage: "/Casa da Comunidade Sustentável.jpg",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "Como posso solicitar um atestado de residência?",
    answer:
      "Pode solicitar presencialmente na Junta de Freguesia ou através do Balcão Digital, apresentando documento de identificação e comprovativo de morada.",
    category: "Serviços",
  },
  {
    id: "2",
    question: "Qual o horário de atendimento?",
    answer:
      "O atendimento ao público funciona de segunda a sexta-feira, das 9h00 às 17h00. Às quartas-feiras, horário alargado até às 19h00.",
    category: "Informações Gerais",
  },
  {
    id: "3",
    question: "Como reportar um problema na via pública?",
    answer:
      "Pode utilizar o mapa interativo no nosso website para assinalar e descrever o problema, ou contactar-nos diretamente por telefone ou email.",
    category: "Ocorrências",
  },
  {
    id: "4",
    question: "Posso agendar um atendimento presencial?",
    answer:
      "Sim, pode agendar através do calendário disponível no nosso website ou contactando-nos por telefone.",
    category: "Serviços",
  },
  {
    id: "5",
    question: "Como posso participar no orçamento participativo?",
    answer:
      "As inscrições para o orçamento participativo abrem anualmente. Consulte a secção de notícias para informações sobre os prazos.",
    category: "Participação",
  },
  {
    id: "6",
    question: "Que documentos preciso para pedir uma licença?",
    answer:
      "Os documentos variam conforme o tipo de licença. Consulte a secção de Serviços ou contacte-nos para informações específicas.",
    category: "Serviços",
  },
  {
    id: "7",
    question: "A Junta oferece apoio social?",
    answer:
      "Sim, dispomos de programas de apoio social. Contacte os nossos serviços para avaliação da sua situação.",
    category: "Apoio Social",
  },
  {
    id: "8",
    question: "Como me inscrevo nas atividades desportivas?",
    answer:
      "As inscrições podem ser feitas presencialmente ou através do formulário disponível na secção de Atividades.",
    category: "Atividades",
  },
];

export const eventCategories = ["Todos", "Cultural", "Institucional", "Desporto", "Formação"];
export const faqCategories = [
  "Todos",
  "Serviços",
  "Informações Gerais",
  "Ocorrências",
  "Participação",
  "Apoio Social",
  "Atividades",
];
