"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// ✅ Dynamic import, client-only, no hydration or TS errors
const ForceChart = dynamic(() => import("./ForceChart"), { ssr: false });

type SwitchKey = "red" | "blue";

interface SwitchData {
  name: string;
  type: string;
  actuation: number;
  force: number;
  total: number;
  pressData: { distance: number; force: number }[];
  releaseData: { distance: number; force: number }[];
}

export default function ForceTravelDiagram() {
  const [selectedSwitch, setSelectedSwitch] = useState<SwitchKey>("blue");

  const switches: Record<SwitchKey, SwitchData> = {
    red: {
      name: "Red Switch",
      type: "Lineal",
      actuation: 1.6,
      force: 45,
      total: 4,
      pressData: [
        { distance: 0, force: 0 },
        { distance: 0.5, force: 25 },
        { distance: 1, force: 35 },
        { distance: 1.6, force: 45 },
        { distance: 2.5, force: 50 },
        { distance: 3.5, force: 60 },
        { distance: 4, force: 110 },
      ],
      releaseData: [
        { distance: 0, force: 0 },
        { distance: 0.5, force: 20 },
        { distance: 1, force: 30 },
        { distance: 1.8, force: 40 },
        { distance: 3.5, force: 55 },
        { distance: 4, force: 110 },
      ],
    },
    blue: {
      name: "Blue Switch",
      type: "Clicky",
      actuation: 1.7,
      force: 50,
      total: 4,
      pressData: [
        { distance: 0, force: 0 },
        { distance: 0.5, force: 30 },
        { distance: 1, force: 45 },
        { distance: 1.7, force: 60 },
        { distance: 2, force: 50 },
        { distance: 3, force: 70 },
        { distance: 3.8, force: 90 },
        { distance: 4, force: 120 },
      ],
      releaseData: [
        { distance: 0, force: 0 },
        { distance: 0.5, force: 20 },
        { distance: 1, force: 35 },
        { distance: 1.8, force: 50 },
        { distance: 2.5, force: 45 },
        { distance: 3.5, force: 70 },
        { distance: 4, force: 120 },
      ],
    },
  };

  const activeSwitch = switches[selectedSwitch];

  return (
    <section className="  mt-20 w-full flex flex-col items-center justify-center text-white">
  <div className=" rounded-2xl
 bg-[#111] max-w-7xl w-full flex flex-col lg:flex-row gap-10 items-stretch justify-center">
    {/* Chart */}
    <div className="
        flex items-center justify-center 
      w-full lg:w-1/2  
      p-6 sm:p-8 
      min-h-[320px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[500px]
      ">
      <ForceChart 
        pressData={activeSwitch.pressData}
        releaseData={activeSwitch.releaseData}
      />
    </div>

    {/* Info */}
  {/* Info Section — styled like ProductSpecs */}
<div className="  p-6 sm:p-8 w-full lg:w-1/2 flex flex-col justify-between   min-h-[380px] sm:min-h-[450px] lg:min-h-[500px]">
  <div className="space-y-8">
    {/* Title + description */}
    <div>
      <h2 className="text-[#a7a7ab] uppercase text-sm tracking-wide mb-1">
        {activeSwitch.type === "Lineal" ? "Precisión" : "Tacto"}
      </h2>
      <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight">
        {activeSwitch.name}
      </h2>

      <p className="text-[#c9c9c9] text-base leading-relaxed max-w-md">
        {activeSwitch.type === "Lineal"
          ? "Los switches lineales ofrecen una experiencia suave, rápida y silenciosa, ideales para quienes buscan un teclado gamer mecánico con pulsaciones precisas y consistentes. Inspirados en la ingeniería de teclados hot-swap de alto rendimiento, combinan velocidad, fluidez y precisión absoluta para juegos y escritura prolongada."
          : "Los switches azules ofrecen una respuesta táctil marcada y un clic audible clásico, brindando la sensación auténtica de un teclado gamer mecánico profesional. Perfectos para programar, escribir y disfrutar de la precisión acústica que caracteriza los switches clicky. Una experiencia que combina retroalimentación, sonido y control."}
      </p>
    </div>

    {/* Buttons for switch selection */}
    <div className="flex flex-wrap gap-2">
      {(Object.keys(switches) as SwitchKey[]).map((key) => (
        <button
          key={key}
          onClick={() => setSelectedSwitch(key)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedSwitch === key
              ? "bg-[#5b5bff] text-white"
              : "bg-[#222] text-gray-300 hover:bg-[#2f2f2f]"
          }`}
        >
          {switches[key].name}
        </button>
      ))}
    </div>

    {/* Specification cards */}
    <div className="flex flex-wrap gap-4">
      {[
        { label: "Fuerza de activación", value: `${activeSwitch.force} g` },
        { label: "Punto de actuación", value: `${activeSwitch.actuation} mm` },
        { label: "Tipo", value: activeSwitch.type },
        { label: "Recorrido total", value: `${activeSwitch.total} mm` },
      ].map((spec, i) => (
        <div
          key={i}
          className="flex-1 min-w-[140px] bg-[#181818] text-center rounded-2xl p-5  border border-[#222]"
        >
          <div className="text-sm text-[#a7a7ab] mb-1">{spec.label}</div>
          <div className="text-xl text-white font-semibold">{spec.value}</div>
        </div>
      ))}
    </div>
  </div>
</div>

  </div>
</section>

  );
}
