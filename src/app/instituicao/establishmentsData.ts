export type EstablishmentGalleryItem = {
  src: string;
  alt: string;
};

export type Establishment = {
  slug: string;
  name: string;
  type: string;
  coverImage: string;
  contact: string;
  address: string;
  socialUrl: string;
  openingHours: string;
  description: string;
  gallery: EstablishmentGalleryItem[];
};

// Template data. This will be replaced by CMS content.
export const establishments: Establishment[] = [
  {
    slug: "escola-basica-central",
    name: "Escola Basica Central",
    type: "Estabelecimento de Ensino",
    coverImage: "/hero-bg.jpg",
    contact: "+351 234 000 101",
    address: "Rua da Escola, 23, Gafanha da Vagueira",
    socialUrl: "https://facebook.com",
    openingHours: "Seg-Sex, 08h00-18h00",
    description:
      "A Escola Basica Central serve a comunidade escolar local com uma oferta educativa integrada e atividades de apoio a familia.",
    gallery: [
      { src: "/hero-bg.jpg", alt: "Entrada principal da escola" },
      { src: "/hero-bg.jpg", alt: "Patio exterior da escola" },
      { src: "/hero-bg.jpg", alt: "Sala de atividades" },
    ],
  },
  {
    slug: "centro-social-comunitario",
    name: "Centro Social Comunitario",
    type: "Apoio Social",
    coverImage: "/hero-bg.jpg",
    contact: "+351 234 000 202",
    address: "Avenida da Comunidade, 8, Cacia",
    socialUrl: "https://instagram.com",
    openingHours: "Seg-Sex, 09h00-17h30",
    description:
      "Equipamento dedicado ao apoio social de proximidade, com respostas para familias, idosos e situacoes de vulnerabilidade.",
    gallery: [
      { src: "/hero-bg.jpg", alt: "Fachada do centro social" },
      { src: "/hero-bg.jpg", alt: "Sala de atendimento" },
      { src: "/hero-bg.jpg", alt: "Area de convivo" },
    ],
  },
  {
    slug: "polo-cultural-freguesia",
    name: "Polo Cultural da Freguesia",
    type: "Equipamento Cultural",
    coverImage: "/hero-bg.jpg",
    contact: "+351 234 000 303",
    address: "Largo da Cultura, 12, Gafanha da Vagueira",
    socialUrl: "https://facebook.com",
    openingHours: "Seg-Sab, 10h00-20h00",
    description:
      "Espaco destinado a atividades culturais, exposicoes, oficinas e programacao artistica de acesso publico.",
    gallery: [
      { src: "/hero-bg.jpg", alt: "Auditório do polo cultural" },
      { src: "/hero-bg.jpg", alt: "Exposição no polo cultural" },
      { src: "/hero-bg.jpg", alt: "Atividade comunitaria" },
    ],
  },
  {
    slug: "unidade-desportiva-municipal",
    name: "Unidade Desportiva Municipal",
    type: "Infraestrutura Desportiva",
    coverImage: "/hero-bg.jpg",
    contact: "+351 234 000 404",
    address: "Rua do Desporto, 44, Cacia",
    socialUrl: "https://instagram.com",
    openingHours: "Seg-Dom, 07h00-22h00",
    description:
      "Complexo para pratica desportiva, treinos e eventos locais, com valencias para varias modalidades.",
    gallery: [
      { src: "/hero-bg.jpg", alt: "Campo principal da unidade desportiva" },
      { src: "/hero-bg.jpg", alt: "Pavilhao interior" },
      { src: "/hero-bg.jpg", alt: "Zona de bancada" },
    ],
  },
];
