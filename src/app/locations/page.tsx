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
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-[#f9fafb]">
      <section className="bg-white border border-[#80d12a] shadow-md rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-[#052a47] flex-grow">Filtros</h2>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-[#052a47]">
            <input
              type="checkbox"
              checked={isMultiFilter}
              onChange={(e) => {
                setIsMultiFilter(e.target.checked);
                resetAll();
              }}
              className="h-4 w-4 text-[#4dbf38] border-gray-300 rounded focus:ring-[#80d12a]"
            />
            Múltiple filtro
          </label>
        </div>

        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-[#052a47] mb-1" htmlFor="locationId">ID de Ubicación</label>
            <input
              id="locationId"
              type="text"
              placeholder="Ingrese ID de ubicación"
              className="px-4 py-2 border border-[#4dbf38] rounded-md shadow-sm focus:ring-2 focus:ring-[#80d12a]"
              value={draftFilters.id}
              onChange={e => handleFilterChange({ id: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-[#052a47] mb-1" htmlFor="userId">ID de Usuario</label>
            <input
              id="userId"
              type="text"
              placeholder="Ingrese ID de usuario"
              className="px-4 py-2 border border-[#4dbf38] rounded-md shadow-sm focus:ring-2 focus:ring-[#80d12a]"
              value={draftFilters.userId}
              onChange={e => handleFilterChange({ userId: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-[#052a47] mb-1" htmlFor="packageId">ID de Paquete</label>
            <input
              id="packageId"
              type="text"
              placeholder="Ingrese ID de paquete"
              className="px-4 py-2 border border-[#4dbf38] rounded-md shadow-sm focus:ring-2 focus:ring-[#80d12a]"
              value={draftFilters.packageId}
              onChange={e => handleFilterChange({ packageId: e.target.value })}
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={applyFilters}
              className="px-4 py-2 rounded-md shadow transition bg-[#4dbf38] text-white hover:bg-[#80d12a]"
            >
              Buscar
            </button>
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-[#f0fdf4] text-[#052a47] rounded-md border border-[#80d12a] hover:bg-[#e6ffe0] transition"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {loading && <p className="text-center text-[#052a47]">Cargando…</p>}
      {error && <p className="text-center text-red-600 font-semibold">Error: {error.message}</p>}
      {!loading && locations.length === 0 && <p className="text-center text-[#052a47]">No se encontraron ubicaciones.</p>}

      <div className="space-y-4">
        {locations.map((loc: Location) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </div>
  );
}
