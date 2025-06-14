"use client"

import { useState, useCallback } from 'react';
import { usePackages } from '../../hooks/usePackage';
import StatusFilter from '../../components/StatusFilter';
import { Package } from '../../types/package';
import { PackageCard } from '../../components/PackageCard';

const EMPTY_FILTERS = {
  trackingCode: '',
  statusIds: [] as number[],
  startDate: '',
  endDate: '',
  id: '',
  userId: '',
  origin: '',
  destination: '',
};

export default function PackagesPage() {
  const [isMultiFilter, setIsMultiFilter] = useState(false);
  
  const [draftFilters, setDraftFilters] = useState({ ...EMPTY_FILTERS });
  const [appliedFilters, setAppliedFilters] = useState({ ...EMPTY_FILTERS });

  const { packages, loading, error } = usePackages(appliedFilters);

  const handleFilterChange = useCallback((update: Partial<typeof EMPTY_FILTERS>) => {
    if (isMultiFilter) {
      setDraftFilters(prev => ({ ...prev, ...update }));
    } else {
      const newExclusiveFilter = { ...EMPTY_FILTERS, ...update };
      setDraftFilters(newExclusiveFilter);
    }
  }, [isMultiFilter]);

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const resetAll = () => {
    setDraftFilters({ ...EMPTY_FILTERS });
    setAppliedFilters({ ...EMPTY_FILTERS });
  };
  
  const isUniqueIdFieldDisabled = isMultiFilter;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
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

        <div className="flex flex-wrap items-end justify-center gap-6">
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="tracking">Código de seguimiento</label>
            <input
              id="tracking"
              type="text"
              placeholder="Ingrese código"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed"
              value={draftFilters.trackingCode}
              onChange={e => handleFilterChange({ trackingCode: e.target.value })}
              disabled={isUniqueIdFieldDisabled}
            />
          </div>
          
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="packageId">ID de Paquete</label>
            <input
              id="packageId"
              type="text"
              placeholder="Ingrese ID"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed"
              value={draftFilters.id}
              onChange={e => handleFilterChange({ id: e.target.value })}
              disabled={isUniqueIdFieldDisabled}
            />
          </div>

          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
            <StatusFilter
              value={draftFilters.statusIds}
              onChange={ids => handleFilterChange({ statusIds: ids })}
            />
          </div>
          
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="userId">ID de Usuario</label>
            <input
              id="userId"
              type="text"
              placeholder="Ingrese ID de usuario"
              className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.userId}
              onChange={e => handleFilterChange({ userId: e.target.value })}
            />
          </div>
          
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="origin">Origen</label>
            <input
              id="origin"
              type="text"
              placeholder="Ciudad de origen"
              className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.origin}
              onChange={e => handleFilterChange({ origin: e.target.value })}
            />
          </div>
          
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="destination">Destino</label>
            <input
              id="destination"
              type="text"
              placeholder="Ciudad de destino"
              className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.destination}
              onChange={e => handleFilterChange({ destination: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="startDate">Fecha inicio</label>
            <input
              id="startDate"
              type="date"
              className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.startDate.split('T')[0] || ''}
              onChange={e => handleFilterChange({ startDate: e.target.value ? `${e.target.value}T00:00:00.000000` : '' })}
            />
          </div>

          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="endDate">Fecha fin</label>
            <input
              id="endDate"
              type="date"
              className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.endDate.split('T')[0] || ''}
              onChange={e => handleFilterChange({ endDate: e.target.value ? `${e.target.value}T23:59:59.999999` : '' })}
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
      {!loading && packages.length === 0 && <p className="text-center text-gray-600">No se encontraron paquetes.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg: Package) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}