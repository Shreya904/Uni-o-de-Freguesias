export type PublicSpace = {
  slug: string;
  name: string;
  shortDescription: string;
  heroImage: string;
  gridImage: string;
  constructionStart: string;
  constructionEnd: string;
  inauguration: string;
  initialFunction: string;
  coordinates: string;
  location: string;
  title: string;
  description: string;
};

// Template data. This will be replaced by CMS content.
export const publicSpaces: PublicSpace[] = [
  {
    slug: "parque-central",
    name: "Parque Central",
    shortDescription: "Zona verde com percursos pedonais, parque infantil e areas de convivio.",
    heroImage: "/hero-bg.jpg",
    gridImage: "/hero-bg.jpg",
    constructionStart: "2008",
    constructionEnd: "2010",
    inauguration: "2010-06-18",
    initialFunction: "Espaco publico de lazer e recreio para familias e visitantes.",
    coordinates: "40.6405, -8.6538",
    location: "Centro da freguesia",
    title: "Parque Central: o principal espaco verde da comunidade",
    description:
      "O Parque Central e um ponto de encontro intergeracional, com zonas para caminhada, atividades ao ar livre e eventos locais. A configuracao paisagistica privilegia a sustentabilidade e o conforto dos utilizadores ao longo de todo o ano.",
  },
  {
    slug: "mercado-municipal",
    name: "Mercado Municipal",
    shortDescription: "Espaco de comercio local e dinamizacao da economia de proximidade.",
    heroImage: "/hero-bg.jpg",
    gridImage: "/hero-bg.jpg",
    constructionStart: "1998",
    constructionEnd: "2000",
    inauguration: "2000-09-12",
    initialFunction: "Concentrar oferta de produtos locais e servicos de proximidade.",
    coordinates: "40.6420, -8.6509",
    location: "Largo do Mercado",
    title: "Mercado Municipal: tradicao, frescura e economia local",
    description:
      "O Mercado Municipal continua a ser um eixo economico e social, reunindo produtores, comerciantes e residentes. O espaco integra valencias para abastecimento diario e acolhe periodicamente iniciativas de promocao do comercio local.",
  },
  {
    slug: "pavilhao-desportivo",
    name: "Pavilhao Desportivo",
    shortDescription: "Infraestrutura para atividades desportivas, treinos e eventos comunitarios.",
    heroImage: "/hero-bg.jpg",
    gridImage: "/hero-bg.jpg",
    constructionStart: "2014",
    constructionEnd: "2016",
    inauguration: "2016-04-03",
    initialFunction: "Promover atividade fisica, competicao e uso comunitario do desporto.",
    coordinates: "40.6389, -8.6484",
    location: "Zona Escolar e Desportiva",
    title: "Pavilhao Desportivo: centro de atividade e formacao",
    description:
      "O Pavilhao Desportivo serve clubes, escolas e programas municipais, oferecendo condicoes para treino, competicao e eventos de grande escala. A infraestrutura foi desenhada para uso multifuncional e acessibilidade universal.",
  },
  {
    slug: "jardim-ribeirinho",
    name: "Jardim Ribeirinho",
    shortDescription: "Corredor paisagistico junto a agua, ideal para passeio e contemplacao.",
    heroImage: "/hero-bg.jpg",
    gridImage: "/hero-bg.jpg",
    constructionStart: "2017",
    constructionEnd: "2019",
    inauguration: "2019-07-21",
    initialFunction: "Requalificar margem ribeirinha e criar percurso pedonal publico.",
    coordinates: "40.6357, -8.6571",
    location: "Margem ribeirinha",
    title: "Jardim Ribeirinho: natureza e mobilidade suave",
    description:
      "O Jardim Ribeirinho reforca a ligacao entre a comunidade e a frente de agua, com zonas de estadia, percurso continuo e integracao de vegetacao autoctone. E um espaco particularmente procurado para lazer e atividade fisica leve.",
  },
];
