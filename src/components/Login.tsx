'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("http://localhost:8080/oauth2/authorization/google")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#052A47] px-4">
      <div className="flex w-full max-w-4xl h-[500px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Imagen decorativa */}
        <div className="w-1/2 relative hidden md:block">
          <Image
            src="/img/Repartidor.png"
            alt="Decoración"
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between animate-fade-in">
          {/* Encabezado */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image src="/img/Logo.png" alt="Logo" width={60} height={60} className="transition-transform duration-300 hover:rotate-6" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#052A47] tracking-tight">CourierSync</h1>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#052A47] mb-2 transition-colors duration-300 hover:text-[#07406C]">
              Inicio de sesión
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
              Nos alegra verte de nuevo,<br className="hidden md:inline" /> ¡Vamos al siguiente paso!
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#052A47] transition-all duration-200 text-sm"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#052A47] transition-all duration-200 text-sm"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#052A47] text-white px-6 py-2 rounded-md hover:bg-[#07406C] active:scale-95 transition-all duration-200 shadow hover:shadow-md cursor-pointer"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-4 transition-opacity hover:opacity-80">
            © Universidad de Antioquia | 2025 Code F@ctory
          </p>
        </div>
      </div>
    </div>
  )
}
