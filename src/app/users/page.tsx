"use client";

import Link from 'next/link';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../types/user';
import { UserCard } from '../../components/UserCard';

const AddUserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg> );

export default function UsersPage() {
  const { users, loading, error } = useUsers();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-800">Gestión de Usuarios</h1>
        <Link 
            href="/users/add"
            className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 transition"
        >
            <AddUserIcon />
            Crear Nuevo Usuario
        </Link>
      </div>

      {loading && <p className="text-center text-gray-500">Cargando usuarios...</p>}
      {error && <p className="text-center text-red-600 font-semibold">Error: {error.message}</p>}
      {!loading && users.length === 0 && <p className="text-center text-gray-600">No se encontraron usuarios.</p>}

      <div className="space-y-4">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}