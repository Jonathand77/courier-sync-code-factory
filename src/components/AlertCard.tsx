import { AlertCardProps } from '../types/alert';

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export function AlertCard({ alert }: AlertCardProps) {
  const formattedDate = new Date(alert.registeredAt).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white border border-indigo-200 shadow-sm rounded-lg p-5 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 text-indigo-600">
            <AlertIcon />
          </div>
          <div>
            <p className="text-lg font-bold text-indigo-700">{alert.alertTypeEntity.name}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          ID: {alert.id}
        </span>
      </div>

      <div className="pl-9">
        <p className="text-gray-700">{alert.description}</p>
        {alert.alertTypeEntity.description && (
          <p className="mt-1 text-xs text-gray-500 italic">({alert.alertTypeEntity.description})</p>
        )}
      </div>

      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pl-9">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 text-gray-500"><UserIcon /></div>
          <div>
            <p className="font-semibold text-gray-700">Usuario notificado:</p>
            <p className="text-gray-600">{alert.user.name} ({alert.user.email})</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 text-gray-500"><PackageIcon /></div>
          <div>
            <p className="font-semibold text-gray-700">Paquete relacionado:</p>
            <p className="text-gray-600 font-mono">{alert.packageEntity.trackingCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}