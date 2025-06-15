"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ADD_PACKAGE_MUTATION, UPDATE_PACKAGE_MUTATION, DELETE_PACKAGE_MUTATION } from '../services/package.mutations';
import { Package } from '../types/package';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const CheckCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> );
const ExclamationCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg> );
const TrashIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg> );

interface PackageFormProps {
  initialData?: Package;
}

const STATUS_OPTIONS = [
  { id: '1', name: 'PENDING' },
  { id: '2', name: 'IN TRANSIT' },
  { id: '3', name: 'DELIVERED' },
  { id: '4', name: 'CANCELLED' },
  { id: '5', name: 'RETURNED'}
];

export function PackageForm({ initialData }: PackageFormProps) {
  const isEditMode = !!initialData;
  const router = useRouter();

  if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
  }

  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    origin: initialData?.origin || '',
    destination: initialData?.destination || '',
    ownerUserId: initialData?.ownerUser?.id || '',
    statusId: initialData?.status?.id?.toString() || '1',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [addPackage, { loading: loadingAdd }] = useMutation(ADD_PACKAGE_MUTATION, { /*...*/ });
  const [updatePackage, { loading: loadingUpdate }] = useMutation(UPDATE_PACKAGE_MUTATION, { /*...*/ });
  const [deletePackage, { loading: loadingDelete }] = useMutation(DELETE_PACKAGE_MUTATION, { /*...*/ });
  
  const handleSuccess = (message: string) => {
    setFeedback({ type: 'success', message });
    setTimeout(() => router.push('/packages'), 2000);
  };

  const handleError = (error: ApolloError) => {
    setFeedback({ type: 'error', message: `Error: ${error.message}` });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    
    try {
      if (isEditMode) {
        const payload = {
          id: initialData.id,
          description: formData.description,
          origin: formData.origin,
          destination: formData.destination,
          ownerUser: { id: formData.ownerUserId },
          status: { id: parseInt(formData.statusId) }
        };
        const { data } = await updatePackage({ variables: { packageEntity: payload } });
        handleSuccess(data.updatePackage.message || 'Paquete actualizado con éxito.');
      } else {
        const payload = {
          description: formData.description,
          origin: formData.origin,
          destination: formData.destination,
          ownerUser: { id: formData.ownerUserId },
          status: { id: parseInt(formData.statusId) },
        };
        await addPackage({ variables: { packageEntity: payload } });
        handleSuccess('Paquete creado con éxito.');
      }
    } catch (error) {
      if (error instanceof ApolloError) handleError(error);
      else console.error("Error inesperado en handleSubmit:", error);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este paquete?')) {
      try {
        await deletePackage({ variables: { id: initialData?.id } });
        handleSuccess('Paquete eliminado correctamente.');
      } catch (error) {
        if (error instanceof ApolloError) handleError(error);
        else console.error("Error inesperado en handleDelete:", error);
      }
    }
  };

  const isLoading = loadingAdd || loadingUpdate || loadingDelete;

  if (isEditMode && !initialData) {
    return <p>Cargando datos del paquete...</p>;
  }

  return (
    <div className="bg-white border border-neutral-200 shadow-lg rounded-xl max-w-2xl mx-auto">
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold text-[#052a47]">
          {isEditMode ? 'Editar Paquete' : 'Registrar Nuevo Paquete'}
        </h2>
        <p className="text-gray-500 mt-1">
          {isEditMode ? `Modificando paquete con ID: ${initialData?.id}` : 'Completa los datos para registrar un nuevo paquete.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="ownerUserId" className="block text-sm font-semibold text-[#052a47] mb-1">ID del Propietario</label>
                <input type="text" name="ownerUserId" id="ownerUserId" value={formData.ownerUserId} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38]" required />
            </div>
            
            <div>
              <label htmlFor="statusId" className="block text-sm font-semibold text-[#052a47] mb-1">Estado del Paquete</label>
              <select
                name="statusId"
                id="statusId"
                value={formData.statusId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38] bg-white"
                required
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#052a47] mb-1">Descripción</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38]" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="origin" className="block text-sm font-semibold text-[#052a47] mb-1">Origen</label>
                <input type="text" name="origin" id="origin" value={formData.origin} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38]" required />
            </div>
            <div>
                <label htmlFor="destination" className="block text-sm font-semibold text-[#052a47] mb-1">Destino</label>
                <input type="text" name="destination" id="destination" value={formData.destination} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38]" required />
            </div>
        </div>

        {feedback && (
          <div className={`flex items-center gap-3 p-3 rounded-md text-sm ${
              feedback.type === 'success' ? 'bg-green-100 text-[#4dbf38]' : 'bg-red-100 text-red-800'
            }`}>
            {feedback.type === 'success' ? <CheckCircleIcon /> : <ExclamationCircleIcon />}
            {feedback.message}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            {isEditMode && (
              <button type="button" onClick={handleDelete} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50">
                <TrashIcon />
                Eliminar
              </button>
            )}
          </div>
          <button type="submit" disabled={isLoading} className="px-6 py-2.5 font-semibold text-[#052a47] bg-[#80d12a] rounded-md shadow-md hover:bg-[#4dbf38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4dbf38] disabled:opacity-60 disabled:cursor-wait">
            {isLoading ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Paquete')}
          </button>
        </div>
      </form>
    </div>
  );
}