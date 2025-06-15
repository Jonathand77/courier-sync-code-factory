"use client";

import { useMutation, ApolloError } from '@apollo/client';
import { User } from '../types/user';
import { DELETE_USER_MUTATION } from '../services/user.mutations';
import { GET_ALL_USERS_QUERY } from '../services/user.queries';
import { useState } from 'react';

const TrashIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg> );

const RoleBadge = ({ roleName }: { roleName?: string }) => {
  if (!roleName) return null;

  const roleStyles: { [key: string]: string } = {
    ADMIN: `bg-red-100 text-red-800`,
    SUPERVISOR: `bg-yellow-100 text-[#052a47]`,
    WAREHOUSE_STAFF: `bg-blue-100 text-[#052a47]`,
    LOGISTICS_STAFF: `bg-purple-100 text-[#052a47]`,
    CUSTOMER: `bg-green-200 text-[#052a47]`,
    DEFAULT: `bg-gray-100 text-[#052a47]`,
  };

  const style = roleStyles[roleName.toUpperCase()] || roleStyles.DEFAULT;

  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${style}`}>
      {roleName}
    </span>
  );
};

const UserAvatar = ({ name }: { name: string }) => {
    const colors = [
        'bg-green-200', 'bg-teal-200', 'bg-blue-200', 
        'bg-purple-200', 'bg-pink-200', 'bg-yellow-200'
    ];
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorClass = colors[charCodeSum % colors.length];
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className={`flex items-center justify-center h-12 w-12 rounded-full ${colorClass} text-[#052a47] font-bold text-xl`}>
            {initial}
        </div>
    );
};

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const [error, setError] = useState<string | null>(null);

  const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [{ query: GET_ALL_USERS_QUERY }],
    onError: (apolloError: ApolloError) => {
        setError(`Error: ${apolloError.message}`);
        setTimeout(() => setError(null), 3000);
    }
  });

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${user.name}?`)) {
        deleteUser({ variables: { id: user.id } });
    }
  };

  return (
    <div className="group bg-white p-5 rounded-xl border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:shadow-[#4dbf38]/20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <UserAvatar name={user.name} />
            <div>
                <div className="flex items-center gap-3">
                    <p className="font-semibold text-lg text-[#052a47]">{user.name}</p>
                    <RoleBadge roleName={user.roleEntity?.name} />
                </div>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
        </div>
        
        <div className="flex-shrink-0">
            <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-50"
                title="Eliminar usuario"
            >
                {loading ? 'Borrando...' : <><TrashIcon /> Eliminar</>}
            </button>
        </div>
      </div>
      {error && <p className="text-xs text-red-600 mt-2 text-right">{error}</p>}
    </div>
  );
}