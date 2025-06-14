'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      localStorage.setItem('jwt', token)
      router.push('/packages')
    } else {
      alert('Token no encontrado en la URL')
    }
  }, [router])

  return (
    <div className="p-8 text-center">
      Procesando autenticación…
    </div>
  )
}
