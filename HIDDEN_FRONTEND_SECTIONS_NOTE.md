Temporariamente foram comentados/ocultados do frontend: a secao "Participacao - Mapa Interativo de Ocorrencias" da homepage, o item de navegacao "Reportar Ocorrencia" e a pagina completa "/mapa" (Mapa de Ocorrencias).
Temporariamente foram comentados/ocultados do frontend: a secao "Agende o seu Atendimento Presencial" da homepage, os links de navegacao para "/agendar" e a pagina completa "/agendar" (Agendar Atendimento).

Checklist atual - ocultacao simplificada de frontend (temporario)
- [x] Secao de Eventos da homepage comentada em src/app/page.tsx.
- [x] Navegacao do Header reduzida para: Início, Notícias, Contactos.
- [x] Navegacao do Footer reduzida para: Início, Notícias, Contactos.
- [x] CTA secundario da Hero alterado de Eventos para Notícias.
- [x] Acesso direto a paginas fora do escopo temporario bloqueado via whitelist em middleware.ts.

Rotas atualmente permitidas (whitelist)
- /
- /noticias
- /noticias/[slug]
- /contactos
- /faq
- /institucional/documentacao
