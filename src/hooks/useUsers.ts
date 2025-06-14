import { useQuery } from '@apollo/client';
import { GET_ALL_USERS_QUERY } from '../services/user.queries';

export function useUsers() {
  const { data, loading, error } = useQuery(GET_ALL_USERS_QUERY);

  return {
    users: data?.findAllUsers || [],
    loading,
    error,
  };
}