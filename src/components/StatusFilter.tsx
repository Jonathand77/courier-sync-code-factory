import React from 'react';

const statusOptions = [
  { id: 1, label: 'PENDING' },
  { id: 2, label: 'IN TRANSIT' },
  { id: 3, label: 'DELIVERED' },
  { id: 4, label: 'CANCELLED' },
  { id: 5, label: 'RETURNED' },
];

type StatusFilterProps = {
  value?: number[];
  onChange: (selectedIds: number[]) => void;
};

export default function StatusFilter({ value = [], onChange }: StatusFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const newSelectedIds = selectedId ? [parseInt(selectedId, 10)] : [];
    onChange(newSelectedIds);
  };

  const selectedValue = value.length > 0 ? String(value[0]) : '';

  return (
    <div className="w-64">
      <select
        value={selectedValue}
        onChange={handleChange}
        id="status"
        className="
          block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 
          rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
          focus:border-indigo-500 transition duration-200 ease-in-out cursor-pointer
        "
        aria-label="Filtro por estado del paquete"
      >
        <option value="">Seleccione estado</option>
        {statusOptions.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}