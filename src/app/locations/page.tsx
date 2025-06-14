"use client"

import { useState, useCallback } from 'react';
import { useLocations } from '../../hooks/useLocation';
import { Location, LocationFilters } from '../../types/location';
import { LocationCard } from '../../components/LocationCard';

const EMPTY_LOCATION_FILTERS: LocationFilters = {
  id: '',
  userId: '',
  packageId: '',
};

export default function LocationsPage() {
  const [isMultiFilter, setIsMultiFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState({ ...EMPTY_LOCATION_FILTERS });
  const [appliedFilters, setAppliedFilters] = useState({ ...EMPTY_LOCATION_FILTERS });

  const { locations, loading, error } = useLocations(appliedFilters);

  const handleFilterChange = useCallback((update: Partial<LocationFilters>) => {
    if (isMultiFilter) {
      setDraftFilters(prev => ({ ...prev, ...update }));
    } else {
      const newExclusiveFilter = { ...EMPTY_LOCATION_FILTERS, ...update };
      setDraftFilters(newExclusiveFilter);
    }
  }, [isMultiFilter]);

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const resetAll = () => {
    setDraftFilters({ ...EMPTY_LOCATION_FILTERS });
    setAppliedFilters({ ...EMPTY_LOCATION_FILTERS });
  };
  
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-indigo-700">Historial de Ubicaciones</h1>

      <section className="bg-white border border-neutral-200 shadow-md rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-indigo-900 flex-grow">Filtros</h2>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={isMultiFilter}
              onChange={(e) => {
                setIsMultiFilter(e.target.checked);
                resetAll();
              }}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            Múltiple filtro
          </label>
        </div>

        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="locationId">ID de Ubicación</label>
            <input
              id="locationId"
              type="text"
              placeholder="Ingrese ID de ubicación"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.id}
              onChange={e => handleFilterChange({ id: e.target.value })}
            />
          </div>
          
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="userId">ID de Usuario</label>
            <input
              id="userId"
              type="text"
              placeholder="Ingrese ID de usuario"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.userId}
              onChange={e => handleFilterChange({ userId: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="packageId">ID de Paquete</label>
            <input
              id="packageId"
              type="text"
              placeholder="Ingrese ID de paquete"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.packageId}
              onChange={e => handleFilterChange({ packageId: e.target.value })}
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={applyFilters}
              className="px-4 py-2 rounded-md shadow transition bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Buscar
            </button>
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md border border-neutral-300 hover:bg-neutral-200 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {loading && <p className="text-center text-gray-500">Cargando…</p>}
      {error && <p className="text-center text-red-600 font-semibold">Error: {error.message}</p>}
      {!loading && locations.length === 0 && <p className="text-center text-gray-600">No se encontraron ubicaciones.</p>}

      <div className="space-y-4">
        {locations.map((loc: Location) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </div>
  );
}