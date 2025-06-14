'use client';

import { useParams } from 'next/navigation';
import { useQuery } from "@apollo/client";
import { PackageForm } from "../../../../components/PackageForm";
import { Package } from "../../../../types/package";
import { FIND_PACKAGE_BY_ID_QUERY } from "../../../../services/package.queries"

export default function ManagePackagePage() {
  const params = useParams();
  const packageId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const isAddMode = packageId === 'add';

  const { data, loading, error } = useQuery(FIND_PACKAGE_BY_ID_QUERY, {
    variables: { id: packageId },
    fetchPolicy: 'network-only',
    skip: isAddMode,
  });

  if (isAddMode) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <PackageForm />
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando paquete...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 font-semibold mt-10">Error al cargar el paquete: {error.message}</p>;
  }

  const packageData: Package | undefined = data?.findPackageById;

  if (!packageData) {
    return <p className="text-center text-gray-500 mt-10">No se encontró el paquete con ID {packageId}.</p>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PackageForm initialData={packageData} />
    </div>
  );
}