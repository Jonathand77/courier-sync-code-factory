import Link from 'next/link';
import { Package } from '../types/package';
import { StatusBadge } from './StatusBadge';
import { useState } from 'react';

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
  </svg>
);

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard = ({ pkg }: PackageCardProps) => {
  const formattedDate = new Date(pkg.registeredAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const [copied, setCopied] = useState(false);

  return (
    <div
      className="group flex flex-col justify-between rounded-xl border border-neutral-200
                 bg-white p-6 shadow-md shadow-neutral-200/50
                 transition-all duration-300 ease-in-out
                 hover:border-neutral-300 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <header className="flex items-start justify-between pb-4 border-b border-neutral-200 transition-colors group-hover:border-neutral-300">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-mono text-lg text-indigo-600 pt-1">
              {pkg.trackingCode}
            </h3>
            <div className="relative flex items-center">
              <button
                type="button"
                className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
                title="Copiar código de seguimiento"
                onClick={(e) => {
                  e.stopPropagation(); 
                  navigator.clipboard.writeText(pkg.trackingCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </button>
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white bg-gray-800 px-2 py-1 rounded-md transition-opacity duration-300 animate-fade-in-out">
                  Copiado
                </span>
              )}
            </div>
          </div>
          <p className="text-sm font-normal text-neutral-800">
            {pkg.description}
          </p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <StatusBadge statusName={pkg.status.name} />
        </div>
      </header>
      
      <div className="flex-grow py-6">
        <div className="flex justify-between items-center text-neutral-800">
          <div className="text-left">
            <p className="text-xs text-neutral-500">Origen</p>
            <p className="font-medium text-base">{pkg.origin}</p>
          </div>
          <div className="px-4 text-center">
            <span className="text-2xl text-neutral-400 transition-colors group-hover:text-indigo-500">→</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-500">Destino</p>
            <p className="font-medium text-base">{pkg.destination}</p>
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-4 border-t border-neutral-200 transition-colors group-hover:border-neutral-300">
        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-500 space-y-1">
            <p>
              Propietario: <span className="font-medium text-neutral-600">{pkg.ownerUser.name}</span>
            </p>
            <p>
              Registrado: <span className="font-medium text-neutral-600">{formattedDate}</span>
            </p>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link 
              href={`/packages/manage/${pkg.id}`}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition"
              title="Editar paquete"
            >
              <EditIcon />
              Editar
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};