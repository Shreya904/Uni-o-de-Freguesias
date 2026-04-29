"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import EventsSection from "@/components/home/EventsSection";
import PresidentSection from "@/components/home/PresidentSection";
// import CalendarSection from "@/components/home/CalendarSection";
import NewsSection from "@/components/home/NewsSection";
import DocumentsSection from "@/components/home/DocumentsSection";
// import FAQSection from "@/components/home/FAQSection";
// import MapSection from "@/components/home/MapSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PresidentSection />

        {/* <CalendarSection /> */}
        <NewsSection />
        <DocumentsSection />
        <EventsSection />
        {/* <FAQSection /> */}
        {/* <MapSection /> */}
      </main>
      <Footer />
    </div>
  );
}
