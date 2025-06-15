'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

export default function LoginPage() {
  const router = useRouter()

  const handleGoogleLogin = () => {
    router.push("https://feature4-backend-utuw.onrender.com/oauth2/authorization/google")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#052a47] px-4">
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

        {/* Sección del Login */}
        <div className="w-full md:w-1/2 h-full p-8 flex flex-col justify-center animate-fade-in">
          
          {/* Encabezado */}
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className="flex items-center gap-3 mb-6">
              <Image src="/img/Logo.png" alt="Logo" width={60} height={60} className="transition-transform duration-300 hover:rotate-6" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#052a47] tracking-tight">CourierSync</h1>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#052a47] mb-2 transition-colors duration-300 hover:text-[#4dbf38]">
              Inicio de sesión
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
              Nos alegra verte de nuevo,<br className="hidden md:inline" /> ¡Vamos al siguiente paso!
            </p>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-3 bg-[#80d12a] text-[#052a47] font-semibold px-6 py-2 rounded-md hover:bg-[#4dbf38] active:scale-95 transition-all duration-200 shadow hover:shadow-md cursor-pointer"
              >
                <Image src="/img/Google.png" alt="Google" width={20} height={20} />
                Iniciar sesión con Google
              </button>
            </div>
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