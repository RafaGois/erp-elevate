"use client";

import React,{ useState } from "react";

const services = [
  {
    id: 1,
    name: "INSTITUCIONAL",
    description: "Descrição do serviço 1",
  },
  {
    id: 2,
    name: "ESPORTE",
    description: "Descrição do serviço 2",
  },
  {
    id: 3,
    name: "GASTRONOMIA",
    description: "Descrição do serviço 3",
  },
  {
    id: 4,
    name: "CASAMENTOS",
    description: "Descrição do serviço 4",
  },
  {
    id: 5,
    name: "EVENTOS",
    description: "Descrição do serviço 5",
  },
  {
    id: 6,
    name: "INAUGURAÇÕES",
    description: "Descrição do serviço 5",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("Serviço 1");
  
  function correctClass(service: string) {
    if (service === selectedService) {
      return "opacity-100";
    }
    return "opacity-30";
  }

  function renderServices() {

    return services.map((service) => (
      <div key={service.id}>
        <h2 onMouseEnter={() => setSelectedService(service.name)} className={`${correctClass(service.name)} text-4xl cursor-pointer select-none`}>{service.name}</h2>
      </div>
    ));
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-svh">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-left">Serviços</h2>
        <p className="text-left">blablabla</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 justify-center">
        {renderServices()}
      </div>
    </div>
  );
}
