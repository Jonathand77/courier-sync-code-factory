"use client"

import { useState, useCallback } from 'react';
import { useAlerts } from '../../hooks/useAlert';
import { Alert, AlertFilters } from '../../types/alert';
import { AlertCard } from '../../components/AlertCard';

const EMPTY_ALERT_FILTERS: AlertFilters = {
  userId: '',
};

export default function AlertsPage() {
  const [draftFilters, setDraftFilters] = useState({ ...EMPTY_ALERT_FILTERS });
  const [appliedFilters, setAppliedFilters] = useState({ ...EMPTY_ALERT_FILTERS });

  const { alerts, loading, error } = useAlerts(appliedFilters);

  const handleFilterChange = useCallback((update: Partial<AlertFilters>) => {
    setDraftFilters({ ...EMPTY_ALERT_FILTERS, ...update });
  }, []);

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const resetAll = () => {
    setDraftFilters({ ...EMPTY_ALERT_FILTERS });
    setAppliedFilters({ ...EMPTY_ALERT_FILTERS });
  };
  
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <section className="bg-white border border-neutral-200 shadow-md rounded-xl p-6 space-y-6">
        <div className="flex flex-wrap items-end gap-6 justify-center">
          <div className="flex flex-col w-64">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="userId">ID de Usuario</label>
            <input
              id="userId"
              type="text"
              placeholder="Filtrar por ID de usuario"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={draftFilters.userId}
              onChange={e => handleFilterChange({ userId: e.target.value })}
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
      {error && <p className="text-center text-indigo-600 font-semibold">Error: {error.message}</p>}
      {!loading && alerts.length === 0 && <p className="text-center text-gray-600">No se encontraron alertas.</p>}

      <div className="space-y-4">
        {alerts.map((alert: Alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}