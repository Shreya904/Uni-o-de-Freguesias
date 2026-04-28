# União de Freguesias - Community Hub (Next.js)

A modern, scalable community hub website built with Next.js 15, featuring dynamic CMS content integration, comprehensive component library, and optimized performance.

## Features

- ✅ Server-Side Rendering (SSR) for better SEO
- ✅ Static Site Generation (SSG) for optimal performance
- ✅ Full TypeScript support
- ✅ Responsive design with Tailwind CSS
- ✅ shadcn/ui component library
- ✅ Real-time data fetching with TanStack React Query
- ✅ Form handling with React Hook Form + Zod validation
- ✅ Dark mode support
- ✅ Multi-language ready (PT-PT)

## Pages

- **Home** - Landing page with featured content
- **Eventos** - Events listing and details
- **Noticias** - News/blog posts
- **FAQ** - Frequently asked questions
- **Contactos** - Contact form and information
- **Mapa** - Location map
- **Agendar** - Scheduling/booking page
- **Freguesia** - Community information & sections
- **Institucional** - Institutional information & sections
- **Serviços** - Services overview
- **Participação** - Community participation/engagement

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: TanStack React Query
- **Forms**: React Hook Form + Zod
- **Package Manager**: pnpm
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Testing**: Vitest + Playwright

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm 8.0.0 or later

### Installation

```bash
# Install dependencies using pnpm
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production server
pnpm lint         # Run ESLint
pnpm type-check   # Check TypeScript types
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── eventos/            # Events routes
│   ├── noticias/           # News routes
│   ├── faq/                # FAQ routes
│   ├── contactos/          # Contact routes
│   ├── mapa/               # Map routes
│   ├── agendar/            # Scheduling routes
│   ├── freguesia/          # Community routes
│   ├── institucional/      # Institutional routes
│   ├── servicos/           # Services routes
│   └── participacao/       # Participation routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── home/               # Home page components
│   └── [other components]
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and helpers
└── data/                   # Static data/content

public/                     # Static assets
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Payload CMS base URL
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### Tailwind CSS

Configured in `tailwind.config.ts` with custom theme variables and animations.

### TypeScript

Configured in `tsconfig.json` with path aliases for cleaner imports (@/).

## Database & CMS Integration

This project is structured to integrate with:

- **Payload CMS** - Recommended for content management
- **Contentful** - Alternative headless CMS
- **Sanity** - Another headless CMS option

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel (automatic from GitHub)
git push origin main
```

### Docker

```bash
docker build -t uniao-freguesias .
docker run -p 3000:3000 uniao-freguesias
```

## Performance Optimizations

- Image optimization with Next.js Image component
- Automatic code splitting
- Static generation with ISR (Incremental Static Regeneration)
- Response caching strategies
- CDN-ready architecture

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

See LICENSE file for details.

## Support

For issues or questions, please open an issue in the repository.

#
