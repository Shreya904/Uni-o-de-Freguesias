"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InfoCardsSection() {
  const [weather, setWeather] = useState({
    today: { min: "--", max: "--" },
    tomorrow: { min: "--", max: "--" },
  });

  useEffect(() => {
    // Fetch daily min and max temperatures for Aveiro using Open-Meteo API
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=40.6443&longitude=-8.6455&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FLisbon",
        );
        const data = await response.json();

        if (data.daily) {
          setWeather({
            today: {
              // Converted to string to match the initial state type
              min: Math.round(data.daily.temperature_2m_min[0]).toString(),
              max: Math.round(data.daily.temperature_2m_max[0]).toString(),
            },
            tomorrow: {
              min: Math.round(data.daily.temperature_2m_min[1]).toString(),
              max: Math.round(data.daily.temperature_2m_max[1]).toString(),
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CARD 1: WEATHER */}
        <div className="flex flex-col items-center justify-center bg-white border-[3px] border-[#1c2841] rounded-lg p-6 min-h-[300px]">
          <h2 className="text-[#1c2841] text-4xl font-extrabold mb-8">Tempo</h2>

          <div className="w-full flex flex-col gap-6">
            {/* Hoje */}
            <div className="flex items-center justify-center gap-6">
              <img src="/hero/cloudy.png" alt="Tempo hoje" className="w-16 h-16 object-contain" />
              <div className="flex flex-col text-left">
                <span className="text-[#1c2841] font-extrabold text-xl leading-tight">Hoje</span>
                <span className="text-[#1c2841] font-bold text-lg whitespace-nowrap">
                  {weather.today.min}° - {weather.today.max}°C
                </span>
              </div>
            </div>

            {/* Amanhã */}
            <div className="flex items-center justify-center gap-6">
              <img src="/hero/sun.png" alt="Tempo amanhã" className="w-16 h-16 object-contain" />
              <div className="flex flex-col text-left">
                <span className="text-[#1c2841] font-extrabold text-xl leading-tight">Amanhã</span>
                <span className="text-[#1c2841] font-bold text-lg whitespace-nowrap">
                  {weather.tomorrow.min}° - {weather.tomorrow.max}°C
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: POLICE */}
        <Link
          href="https://www.psp.pt/Pages/onde-estamos.aspx?f=aveiro"
          className="flex flex-col items-center justify-center bg-[#1c2841] rounded-lg p-6 min-h-[300px] hover:brightness-110 transition-all group"
        >
          <div className="text-center mb-8">
            <span className="text-white/90 text-sm font-bold tracking-wide block mb-2">
              Segurança
            </span>
            <h3 className="text-white text-4xl font-extrabold leading-tight">
              Polícia
              <br />
              Municipal
            </h3>
          </div>
          <img
            src="/hero/policehat.png"
            alt="Polícia Municipal"
            className="w-24 h-24 object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* CARD 3: PHARMACY */}
        <Link
          href="https://www.farmaciasdeservico.net/localidade/aveiro/aveiro"
          className="flex flex-col items-center justify-center bg-[#3b932c] rounded-lg p-6 min-h-[300px] hover:brightness-110 transition-all group"
        >
          <div className="text-center mb-8">
            <span className="text-white/90 text-sm font-bold tracking-wide block mb-2">Saúde</span>
            <h3 className="text-white text-4xl font-extrabold leading-tight">
              Farmácias
              <br />
              de Serviço
            </h3>
          </div>
          <img
            src="/hero/hospital.png"
            alt="Farmácias de Serviço"
            className="w-24 h-24 object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* CARD 4: DIGITAL DESK */}
        <Link
          href="/balcao-digital"
          className="flex flex-col items-center justify-center bg-[#b81d34] rounded-lg p-6 min-h-[300px] hover:brightness-110 transition-all group"
        >
          <div className="text-center mb-8">
            <span className="text-white/90 text-sm font-bold tracking-wide block mb-2">
              Serviços da Junta
            </span>
            <h3 className="text-white text-4xl font-extrabold leading-tight">
              Balcão
              <br />
              Digital
            </h3>
          </div>
          <img
            src="/hero/digital.png"
            alt="Balcão Digital"
            className="w-24 h-24 object-contain group-hover:scale-105 transition-transform"
          />
        </Link>
      </div>
    </section>
  );
}
