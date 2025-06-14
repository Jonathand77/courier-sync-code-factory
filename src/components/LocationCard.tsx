import Link from 'next/link';
import { Location } from '../types/location';

const MapPinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );
const EditIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );
const PackageIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> );

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const formattedDate = new Date(location.updatedAt).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="group flex flex-col justify-between rounded-xl border border-neutral-200
                 bg-white p-6 shadow-md shadow-neutral-200/50
                 transition-all duration-300 ease-in-out
                 hover:border-neutral-300 hover:shadow-lg hover:shadow-indigo-500/10" // Color de sombra hover: teal
    >
      <header className="flex items-start justify-between pb-4 border-b border-neutral-200 transition-colors group-hover:border-neutral-300">
        <div className="flex items-center gap-3">
          <div className="text-indigo-600">
            <MapPinIcon />
          </div>
          <p className="text-lg font-semibold text-gray-800 pt-1">
            {location.address}
          </p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
            ID: {location.id}
          </span>
        </div>
      </header>
      
      <div className="flex-grow py-6 space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex-shrink-0 text-gray-500">
            <PackageIcon />
          </div>
          <div>
            <span className="text-neutral-500">Paquete:</span>
            <span className="ml-2 font-medium font-mono text-neutral-800">{location.packageEntity.trackingCode}</span>
          </div>
        </div>
        
        {(location.latitude && location.longitude) && (
          <div className="flex items-center gap-3 text-sm">
            <div className="flex-shrink-0 text-gray-500">
                <MapPinIcon />
            </div>
            <div>
              <span className="text-neutral-500">Coords:</span>
              <span className="ml-2 font-medium font-mono text-neutral-800">
                {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
              </span>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto pt-4 border-t border-neutral-200 transition-colors group-hover:border-neutral-300">
        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-500 space-y-1">
            <div className="flex items-center gap-1.5">
                <UserIcon />
                <span>
                    Registrado por: <span className="font-medium text-neutral-600">{location.handlerUser.name}</span>
                </span>
            </div>
            <p>
              Fecha: <span className="font-medium text-neutral-600">{formattedDate}</span>
            </p>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link 
              href={`/locations/manage/${location.id}`}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition"
              title="Editar ubicación"
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