import Link from "next/link";

const HelpDeskBanner = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/help-desk.jpg"
        alt="Atendimento ao Balcão Digital"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content Container (Constrained width to match the rest of the site) */}
      <div className="absolute inset-0 w-full max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12 flex items-end justify-end md:items-center">
        {/* Floating Red Box */}
        <div className="bg-[#b81d34] p-6 md:p-8 rounded-md shadow-2xl border-2 border-dashed border-white/80 max-w-sm w-full relative right-0 lg:right-12 mt-auto md:mt-0 mb-8 md:mb-0 translate-y-4 md:translate-y-12">
          <h2 className="text-white font-bold text-2xl md:text-3xl leading-snug mb-4">
            Precisa de um serviço
            <br />
            da Junta?
          </h2>
          <p className="text-white/90 text-sm md:text-base">
            Visite o{" "}
            <Link
              href="/balcao-digital"
              className="underline underline-offset-4 decoration-white/70 hover:decoration-white font-medium transition-all"
            >
              Balcão Digital
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HelpDeskBanner;
