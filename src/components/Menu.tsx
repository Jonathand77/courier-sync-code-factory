'use client'

import { useRouter } from 'next/navigation'
import { FaBoxes, FaShippingFast } from 'react-icons/fa'
import Image from 'next/image'
import React from 'react'

export default function MenuPage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Fondo degradado */}
      {/* Fondos decorativos basados en Figma */}
      <div className="absolute w-[496px] h-[509px] left-[500px] top-[600px] rotate-[-30.29deg] animate-float-slow">
        <Image src="/img/Figura1.png" alt="Figura 1" fill className="object-contain" />
      </div>
      <div className="absolute w-[496px] h-[509px] left-[500px] top-[960px] rotate-[-17.41deg] animate-float">
        <Image src="/img/Figura2.png" alt="Figura 2" fill className="object-contain" />
      </div>
      <div className="absolute w-[900.03px] h-[300.84px] left-[900.93px] top-[600px] rotate-[30.2deg] animate-float">
        <Image src="/img/Figura3.png" alt="Figura 3" fill className="object-contain" />
      </div>
      <div className="absolute w-[400.03px] h-[300.84px] left-[959px] top-[844.93px] rotate-[-7.52deg] animate-float-slow">
        <Image src="/img/Figura4.png" alt="Figura 4" fill className="object-contain" />
      </div>
      <div className="absolute w-[496px] h-[509px] left-[1200.74px] top-[300px] rotate-[26.93deg] animate-float">
        <Image src="/img/Figura5.png" alt="Figura 5" fill className="object-contain" />
      </div>

      {/* Contenedor del Menú */}
      <div className="relative z-10 bg-[#052A47] text-white p-10 rounded-xl w-full max-w-md shadow-2xl text-center animate-fade-in">
        <h1
          className="text-3xl font-extrabold mb-8 transition-all duration-300 hover:scale-105 hover:text-cyan-300"
        >
          Menú Principal
        </h1>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => router.push('/inventario')}
            className="bg-white text-[#052A47] px-6 py-3 rounded-lg flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200 active:scale-95 cursor-pointer"
          >
            <FaBoxes className="text-2xl transition-transform duration-300 group-hover:rotate-6" />
            Consultar inventario
          </button>

          <button
            onClick={() => router.push('/registro')}
            className="bg-white text-[#052A47] px-6 py-3 rounded-lg flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200 active:scale-95 cursor-pointer"
          >
            <FaShippingFast className="text-2xl transition-transform duration-300 group-hover:rotate-6" />
            Registrar envío
          </button>
        </div>
      </div>

      {/* Animaciones personalizadas con Tailwind*/}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
