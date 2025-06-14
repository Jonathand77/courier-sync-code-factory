'use client';

import { useParams } from 'next/navigation';
import { useQuery } from "@apollo/client";
import { LocationForm } from "../../../../components/LocationForm";
import { Location } from "../../../../types/location";
import { FIND_LOCATION_BY_ID_QUERY } from '../../../../services/location.queries';

export default function ManageLocationPage() {
  const params = useParams();
  const locationId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const isAddMode = locationId === 'add';

  const { data, loading, error } = useQuery(FIND_LOCATION_BY_ID_QUERY, {
    variables: { id: locationId },
    fetchPolicy: 'network-only',
    skip: isAddMode,
  });

  if (isAddMode) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <LocationForm />
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando ubicación...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 font-semibold mt-10">Error al cargar la ubicación: {error.message}</p>;
  }

  const locationData: Location | undefined = data?.findLocationById;

  if (!locationData) {
    return <p className="text-center text-gray-500 mt-10">No se encontró la ubicación con ID {locationId}.</p>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <LocationForm initialData={locationData} />
    </div>
  );
}