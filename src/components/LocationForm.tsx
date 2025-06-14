"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ADD_LOCATION_MUTATION, UPDATE_LOCATION_MUTATION, DELETE_LOCATION_MUTATION } from '../services/location.mutations';
import { FIND_ALL_LOCATIONS_QUERY } from '../services/location.queries';
import { Location } from '../types/location'; // Necesitarás crear este tipo
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const CheckCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> );
const ExclamationCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg> );
const TrashIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg> );

interface LocationFormProps {
  initialData?: Location;
}

export function LocationForm({ initialData }: LocationFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
  }

  const [formData, setFormData] = useState({
    handlerUserId: initialData?.handlerUser?.id || '',
    packageId: initialData?.packageEntity?.id || '',
    address: initialData?.address || '',
    latitude: initialData?.latitude?.toString() || '',
    longitude: initialData?.longitude?.toString() || '',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [addLocation, { loading: loadingAdd }] = useMutation(ADD_LOCATION_MUTATION, {
    refetchQueries: [{ query: FIND_ALL_LOCATIONS_QUERY }]
  });
  const [updateLocation, { loading: loadingUpdate }] = useMutation(UPDATE_LOCATION_MUTATION, {
    refetchQueries: [{ query: FIND_ALL_LOCATIONS_QUERY }]
  });
  const [deleteLocation, { loading: loadingDelete }] = useMutation(DELETE_LOCATION_MUTATION, {
    refetchQueries: [{ query: FIND_ALL_LOCATIONS_QUERY }]
  });
  
  const handleSuccess = (message: string) => {
    setFeedback({ type: 'success', message });
    setTimeout(() => router.push('/locations'), 2000); // Redirige a la lista de ubicaciones
  };

  const handleError = (error: ApolloError) => {
    setFeedback({ type: 'error', message: `Error: ${error.message}` });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    
    const latitude = formData.latitude ? parseFloat(formData.latitude) : null;
    const longitude = formData.longitude ? parseFloat(formData.longitude) : null;
    
    try {
      if (isEditMode) {
        const payload = {
          id: initialData.id,
          address: formData.address,
          latitude,
          longitude,
          handlerUser: { id: formData.handlerUserId },
          packageEntity: { id: formData.packageId },
        };
        const { data } = await updateLocation({ variables: { location: payload } });
        handleSuccess(data.updateLocation.message || 'Ubicación actualizada con éxito.');
      } else {
        const payload = {
          address: formData.address,
          latitude,
          longitude,
          handlerUser: { id: formData.handlerUserId },
          packageEntity: { id: formData.packageId },
        };
        await addLocation({ variables: { location: payload } });
        handleSuccess('Ubicación registrada con éxito.');
      }
    } catch (error) {
      if (error instanceof ApolloError) handleError(error);
      else console.error("Error inesperado en handleSubmit:", error);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta ubicación?')) {
      try {
        await deleteLocation({ variables: { id: initialData?.id } });
        handleSuccess('Ubicación eliminada correctamente.');
      } catch (error) {
        if (error instanceof ApolloError) handleError(error);
        else console.error("Error inesperado en handleDelete:", error);
      }
    }
  };

  const isLoading = loadingAdd || loadingUpdate || loadingDelete;

  if (isEditMode && !initialData) {
    return <p>Cargando datos de la ubicación...</p>;
  }

  return (
    <div className="bg-white border border-neutral-200 shadow-lg rounded-xl max-w-2xl mx-auto">
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold text-indigo-800">
          {isEditMode ? 'Editar Ubicación' : 'Registrar Nueva Ubicación'}
        </h2>
        <p className="text-gray-500 mt-1">
          {isEditMode ? `Modificando ubicación ID: ${initialData?.id}` : 'Completa los datos para registrar una nueva ubicación.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="handlerUserId" className="block text-sm font-semibold text-gray-700 mb-1">ID del Usuario (Handler)</label>
                <input type="text" name="handlerUserId" id="handlerUserId" value={formData.handlerUserId} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
                <label htmlFor="packageId" className="block text-sm font-semibold text-gray-700 mb-1">ID del Paquete</label>
                <input type="text" name="packageId" id="packageId" value={formData.packageId} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" required />
            </div>
        </div>
        <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
            <textarea name="address" id="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="latitude" className="block text-sm font-semibold text-gray-700 mb-1">Latitud</label>
                <input type="number" step="any" name="latitude" id="latitude" value={formData.latitude} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="longitude" className="block text-sm font-semibold text-gray-700 mb-1">Longitud</label>
                <input type="number" step="any" name="longitude" id="longitude" value={formData.longitude} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500" />
            </div>
        </div>

        {feedback && (
          <div className={`flex items-center gap-3 p-3 rounded-md text-sm ${
              feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
          <button type="submit" disabled={isLoading} className="px-6 py-2.5 font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-wait">
            {isLoading ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Registrar Ubicación')}
          </button>
        </div>
      </form>
    </div>
  );
}