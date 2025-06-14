import { useQuery } from '@apollo/client';
import {
  FIND_ALL_ALERTS_QUERY,
  FIND_ALERTS_BY_USER_ID_QUERY,
} from '../services/alert.queries';
import { Alert, AlertFilters } from '../types/alert';

export function useAlerts(filters: AlertFilters) {
  const userId = filters.userId?.trim() ?? '';
  const hasUserId = !!userId;

  const {
    data: byUserData,
    loading: byUserLoading,
    error: byUserError,
    refetch: refetchByUser, 
  } = useQuery(FIND_ALERTS_BY_USER_ID_QUERY, {
    variables: { userId: userId },
    skip: !hasUserId, 
  });

  const {
    data: allData,
    loading: allLoading,
    error: allError,
    refetch: refetchAll, 
  } = useQuery(FIND_ALL_ALERTS_QUERY, {
    skip: hasUserId, 
  });

  const loading = byUserLoading || allLoading;
  const error = byUserError || allError;
  
  const refetch = hasUserId ? refetchByUser : refetchAll;
  
  const alerts: Alert[] = hasUserId
    ? byUserData?.findAllAlertsByUserId || []
    : allData?.findAllAlerts || [];
    
  return { alerts, loading, error, refetch };
}