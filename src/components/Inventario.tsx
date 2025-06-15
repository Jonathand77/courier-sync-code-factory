"use client";
import { useState } from "react";

const datosSimulados = [
  { id: 1, guia: "A001", email: "cliente1@mail.com", ruta: "Medellín → Bogotá", estado: "En tránsito" },
  { id: 2, guia: "A002", email: "cliente2@mail.com", ruta: "Cali → Medellín", estado: "Entregado" },
  { id: 3, guia: "A003", email: "cliente3@mail.com", ruta: "Barranquilla → Cartagena", estado: "Pendiente" },
  { id: 4, guia: "A004", email: "cliente4@mail.com", ruta: "Pereira → Manizales", estado: "En tránsito" },
];

export default function Inventario() {
  const [busqueda, setBusqueda] = useState("");
  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  const filtrarDatos = datosSimulados.filter(item =>
    item.guia.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleSeleccion = (id: number) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#052a47] transition duration-300 hover:text-[#4dbf38]">
          Inventario de Envíos
        </h1>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por guía"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 transition duration-300 focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38] focus:outline-none"
          />

          <select
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 transition duration-300 cursor-pointer hover:border-[#4dbf38]"
          >
            <option value="">Filtrar por columna</option>
            <option value="email">Email</option>
            <option value="estado">Estado</option>
            <option value="ruta">Ruta</option>
          </select>
        </div>

        <div className="bg-[#F3F4F6] rounded shadow overflow-hidden">
          <ul>
            {filtrarDatos.map(item => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b p-4 transition duration-300 hover:bg-green-100"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={seleccionados.includes(item.id)}
                    onChange={() => toggleSeleccion(item.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[#4dbf38] focus:ring-[#4dbf38] cursor-pointer"
                  />
                  <div>
                    <p className="font-semibold text-[#052a47] transition duration-300 hover:text-[#4dbf38]">
                      {item.guia}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.ruta}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#052a47] transition duration-300 hover:text-[#4dbf38]">
                  {item.estado}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-700">
            {seleccionados.length} ítems seleccionados
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-[#4dbf38] hover:text-white transition duration-300 cursor-pointer"
            >
              Anterior
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-[#4dbf38] hover:text-white transition duration-300 cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}