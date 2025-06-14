"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icono SVG
function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16.5 9.4a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
      <path d="M19 16.6V12.2a2 2 0 0 0-.7-1.5l-4.6-4.4a2 2 0 0 0-2.7 0l-4.6 4.4A2 2 0 0 0 5 12.2v4.4a2 2 0 0 0 .7 1.5l4.6 4.4a2 2 0 0 0 2.7 0l4.6-4.4a2 2 0 0 0 .7-1.5Z" />
      <path d="m7.1 10.3 5.4 3.1 5.4-3.1" />
      <path d="M12 22.4V13.5" />
    </svg>
  );
}

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

  // No mostrar el navbar en /login
  if (pathname === '/login') return null;

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Izquierda: Logo y navegación */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2" aria-label="Página de inicio">
              <PackageIcon className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-700 hidden sm:inline">EnvíoFácil</span>
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
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
              <span className="text-sm font-bold text-indigo-700 hidden sm:inline">Cerrar Sesión</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
