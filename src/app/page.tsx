"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import EventsSection from "@/components/home/EventsSection";
import PresidentSection from "@/components/home/PresidentSection";
import NewsSection from "@/components/home/NewsSection";
import DocumentsSection from "@/components/home/DocumentsSection";
import InfoCardsSection from "@/components/home/linkCards";
import HelpDeskBanner from "@/components/home/helpDeskbanner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Header and Hero Wrapper */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>
          <HeroSection />
        </div>

        <PresidentSection />
        <InfoCardsSection />

        {/* <CalendarSection /> */}
        <NewsSection />
        <DocumentsSection />
        <EventsSection />
        {/* <FAQSection /> */}
        {/* <MapSection /> */}

        {/* New Help Desk Banner directly above Footer */}
        <HelpDeskBanner />
      </main>
      <Footer />
    </div>
  );
}
