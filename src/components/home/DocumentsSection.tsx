import Link from "next/link";

const DocumentsSection = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row items-center justify-center relative">
        {/* LEFT: Image */}
        <div className="w-full lg:w-[60%] z-0">
          <img
            src="/help-bannerhome.jpg"
            alt="Pessoa idosa a ler documentos"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* RIGHT: Text Content Box */}
        <div className="w-full lg:w-[50%] bg-[#f2f2f2] dark:bg-black p-8 md:p-12 lg:p-16 z-10 lg:-ml-24 lg:mt-16">
          <h2 className="text-[#1c2841] dark:text-white font-extrabold text-4xl md:text-5xl leading-tight mb-4">
            Procura um
            <br />
            documento?
          </h2>

          <h3 className="text-[#1c2841] dark:text-white font-bold text-xl md:text-2xl mb-6">
            Visite o{" "}
            <Link
              href="/institucional/documentacao"
              className="underline decoration-2 underline-offset-4 hover:text-[#1c2841]/70 dark:hover:text-white transition-colors"
            >
              Centro de Documentação
            </Link>
          </h3>

          <p className="text-[#1c2841]/80 dark:text-white/80 text-base md:text-lg leading-relaxed">
            O Centro de Documentação reúne regulamentos, editais, atas, formulários, documentos
            administrativos e outros conteúdos relacionados com a atividade da Junta de Freguesia.
            Utilize a pesquisa e os filtros disponíveis para encontrar rapidamente a informação ou
            documento que procura.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
