"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Rutas de navegación
const navLinks = [
  { href: '/packages', label: 'Paquetes', roles: ['ADMIN', 'USER'] },
  { href: '/alerts', label: 'Alertas', roles: ['ADMIN', 'USER'] },
  { href: '/locations', label: 'Ubicaciones', roles: ['ADMIN', 'USER'] },
  { href: '/users', label: 'Usuarios', roles: ['ADMIN'] },
];

// Componente Navbar
export function Navbar() {
  const pathname = usePathname();

  // No mostrar el navbar en /login o la raíz
  if (pathname === '/login' || pathname === '/') return null;

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Izquierda: Logo y navegación */}
          <div className="flex items-center gap-10">
            <Link href="/packages" className="flex items-center gap-2" aria-label="Página de inicio">
              <Image 
                src="/img/Logo.png" 
                alt="Logo EnvíoFácil" 
                width={40} 
                height={40} 
              />
              <span className="text-xl font-bold text-[#052a47] hidden sm:inline">EnvíoFácil</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'bg-[#80d12a] text-[#052a47]' 
                        : 'text-[#052a47] hover:bg-green-100 hover:text-[#4dbf38]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Derecha: Logout */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2" aria-label="Cerrar sesión">
              <span className="text-sm font-bold text-[#052a47] hover:text-[#4dbf38] transition-colors hidden sm:inline">Cerrar Sesión</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
