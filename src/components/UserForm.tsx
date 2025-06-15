"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ADD_USER_MUTATION } from '../services/user.mutations';
import { GET_ALL_USERS_QUERY } from '../services/user.queries';

const CheckCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> );
const ExclamationCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg> );

const ROLE_OPTIONS = [
  { id: '1', name: 'Admin' },
  { id: '2', name: 'Supervisor' },
  { id: '3', name: 'Warehouse' },
  { id: '4', name: 'Logistics' },
  { id: '5', name: 'Customer' },
];

export function UserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleId: '5', 
  });
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [addUser, { loading }] = useMutation(ADD_USER_MUTATION, {
    refetchQueries: [{ query: GET_ALL_USERS_QUERY }],
  });
  
  const handleSuccess = (message: string) => {
    setFeedback({ type: 'success', message });
    setTimeout(() => router.push('/users'), 2000); 
  };

  const handleError = (error: ApolloError) => {
    setFeedback({ type: 'error', message: `Error: ${error.message}` });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    
    const payload = {
      name: formData.name,
      email: formData.email,
      roleEntity: { id: parseInt(formData.roleId) }, 
    };
    
    try {
      await addUser({ variables: { user: payload } });
      handleSuccess('Usuario creado con éxito.');
    } catch (error) {
      if (error instanceof ApolloError) handleError(error);
      else console.error("Error inesperado en handleSubmit:", error);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 shadow-lg rounded-xl max-w-lg mx-auto">
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold text-[#052a47]">Crear Nuevo Usuario</h2>
        <p className="text-gray-500 mt-1">Completa los datos para registrar un nuevo usuario.</p>
      </div>
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#052a47] mb-1">Nombre Completo</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38]" required />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#052a47] mb-1">Correo Electrónico</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38]" required />
        </div>
        <div>
            <label htmlFor="roleId" className="block text-sm font-semibold text-[#052a47] mb-1">Rol del Usuario</label>
            <select
              name="roleId"
              id="roleId"
              value={formData.roleId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#4dbf38] focus:border-[#4dbf38] bg-white"
              required
            >
              {ROLE_OPTIONS.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
        </div>

        {feedback && (
          <div className={`flex items-center gap-3 p-3 rounded-md text-sm ${
              feedback.type === 'success' ? 'bg-green-100 text-[#4dbf38]' : 'bg-red-100 text-red-800'
            }`}>
            {feedback.type === 'success' ? <CheckCircleIcon /> : <ExclamationCircleIcon />}
            {feedback.message}
          </div>
        )}
        
        <div className="flex justify-end pt-4 border-t">
          <button type="submit" disabled={loading} className="px-6 py-2.5 font-semibold text-[#052a47] bg-[#80d12a] rounded-md shadow-md hover:bg-[#4dbf38] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4dbf38] disabled:opacity-60 disabled:cursor-wait">
            {loading ? 'Creando...' : 'Crear Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
}