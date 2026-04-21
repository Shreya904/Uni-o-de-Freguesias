export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  date: string;
  photoCount: number;
  coverImage: string;
  images: GalleryImage[];
};

// Template data. This will be replaced by CMS content.
export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "festa-da-primavera-2026",
    title: "Festa da Primavera 2026",
    date: "2026-04-20",
    photoCount: 24,
    coverImage: "/hero-bg.jpg",
    images: [
      { src: "/hero-bg.jpg", alt: "Festa da Primavera - vista geral" },
      { src: "/hero-bg.jpg", alt: "Festa da Primavera - atividades" },
      { src: "/hero-bg.jpg", alt: "Festa da Primavera - palco" },
      { src: "/hero-bg.jpg", alt: "Festa da Primavera - comunidade" },
      { src: "/hero-bg.jpg", alt: "Festa da Primavera - familias" },
      { src: "/hero-bg.jpg", alt: "Festa da Primavera - encerramento" },
    ],
  },
  {
    slug: "feira-local-marco",
    title: "Feira Local de Marco",
    date: "2026-03-15",
    photoCount: 18,
    coverImage: "/hero-bg.jpg",
    images: [
      { src: "/hero-bg.jpg", alt: "Feira Local - bancas" },
      { src: "/hero-bg.jpg", alt: "Feira Local - produtos regionais" },
      { src: "/hero-bg.jpg", alt: "Feira Local - artesanato" },
      { src: "/hero-bg.jpg", alt: "Feira Local - comunidade" },
    ],
  },
  {
    slug: "patrimonio-e-memoria",
    title: "Patrimonio e Memoria",
    date: "2026-02-02",
    photoCount: 31,
    coverImage: "/hero-bg.jpg",
    images: [
      { src: "/hero-bg.jpg", alt: "Patrimonio - marco historico" },
      { src: "/hero-bg.jpg", alt: "Patrimonio - edificio historico" },
      { src: "/hero-bg.jpg", alt: "Patrimonio - detalhe" },
      { src: "/hero-bg.jpg", alt: "Patrimonio - envolvente" },
      { src: "/hero-bg.jpg", alt: "Patrimonio - arquivo" },
    ],
  },
  {
    slug: "eventos-culturais-verao",
    title: "Eventos Culturais de Verao",
    date: "2025-08-27",
    photoCount: 42,
    coverImage: "/hero-bg.jpg",
    images: [
      { src: "/hero-bg.jpg", alt: "Eventos Culturais - concerto" },
      { src: "/hero-bg.jpg", alt: "Eventos Culturais - publico" },
      { src: "/hero-bg.jpg", alt: "Eventos Culturais - artistas" },
      { src: "/hero-bg.jpg", alt: "Eventos Culturais - noite" },
      { src: "/hero-bg.jpg", alt: "Eventos Culturais - final" },
    ],
  },
  {
    slug: "vida-comunitaria",
    title: "Vida Comunitaria",
    date: "2025-12-10",
    photoCount: 15,
    coverImage: "/hero-bg.jpg",
    images: [
      { src: "/hero-bg.jpg", alt: "Vida Comunitaria - encontro" },
      { src: "/hero-bg.jpg", alt: "Vida Comunitaria - voluntariado" },
      { src: "/hero-bg.jpg", alt: "Vida Comunitaria - apoio" },
    ],
  },
  {
    slug: "jardim-ribeirinho-em-foco",
    title: "Jardim Ribeirinho em Foco",
    date: "2025-11-03",
    photoCount: 27,
    coverImage: "/hero-bg.jpg",
    images: [
      { src: "/hero-bg.jpg", alt: "Jardim Ribeirinho - trilho" },
      { src: "/hero-bg.jpg", alt: "Jardim Ribeirinho - paisagem" },
      { src: "/hero-bg.jpg", alt: "Jardim Ribeirinho - area verde" },
      { src: "/hero-bg.jpg", alt: "Jardim Ribeirinho - visitantes" },
    ],
  },
];
