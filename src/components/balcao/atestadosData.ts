export const sharedParagraphs = (intro: string) => [
  intro,
  "O requerente terá de trazer fotocópia dos seus documentos (B.I./Passaporte/Cartão de Cidadão e Cartão de Contribuinte).",
  "Não podem ser testemunhas os familiares do requerente nem os cidadãos estrangeiros.",
  "Depois da entrega deste requerimento, o atestado estará pronto num espaço de 2 dias úteis, altura em que poderá ser levantado, até ao limite de 30 dias, depois dessa data será arquivado, juntamente com o processo.",
  "A União das Freguesias de Glória e Vera Cruz utiliza os seus dados pessoais para dar resposta aos seus pedidos, instrução dos seus processos, prestar informação sobre assuntos da autarquia e para fins estatísticos.",
  "Para mais informações sobre as práticas de privacidade da União das Freguesias de Glória e Vera Cruz consulte a nossa página da privacidade ou envie-nos um email para direitoprivacidade.fgloriavcruz@gmail.com.",
  "Para qualquer esclarecimento poderá contactar os nossos serviços através do número 234 427 065",
];

export const atestadoSidebar = (activeHref: string) => [
  { label: "Prova de Vida", href: "/balcao-digital/atestados", active: activeHref === "/balcao-digital/atestados" },
  { label: "Residência", href: "/balcao-digital/atestados/residencia", active: activeHref === "/balcao-digital/atestados/residencia" },
  { label: "Residência para escolas", href: "/balcao-digital/atestados/residencia-escolas", active: activeHref === "/balcao-digital/atestados/residencia-escolas" },
  { label: "Outros atestados", href: "/balcao-digital/atestados/outros", active: activeHref === "/balcao-digital/atestados/outros" },
];