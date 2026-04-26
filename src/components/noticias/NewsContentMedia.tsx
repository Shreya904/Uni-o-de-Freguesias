import Image from "next/image";

type NewsContentMediaProps = {
  date: string;
  title: string;
  description: string;
  category?: string;
  mainImage?: string;
  galleryImages?: string[];
};

export default function NewsContentMedia({
  date,
  title,
  description,
  category,
  mainImage,
  galleryImages = [],
}: NewsContentMediaProps) {
  return (
    <article className="bg-card rounded-2xl border overflow-hidden shadow-sm">
      {mainImage && (
        <div className="relative w-full h-[32vh] min-h-[220px] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] bg-muted/50">
          <Image src={mainImage} alt={title} fill className="object-fill" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-6 md:p-8 lg:p-10 space-y-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time>{date}</time>
          {category && (
            <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {category}
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
          {title}
        </h1>

        <p className="text-muted-foreground leading-relaxed whitespace-pre-line break-words">
          {description}
        </p>
      </div>

      {galleryImages.length > 0 && (
        <div className="border-t p-6 md:p-8 lg:p-10 pt-6 space-y-4 bg-background/70">
          <h2 className="font-display text-xl font-semibold text-foreground">Galeria</h2>
          <div
            className={`grid gap-4 ${
              galleryImages.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {galleryImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative w-full rounded-xl overflow-hidden border border-border/70 ${
                  galleryImages.length === 1 ? "h-[320px] md:h-[420px]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
