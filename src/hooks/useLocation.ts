import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import {
  FIND_LOCATION_BY_ID_QUERY,
  FIND_LOCATIONS_BY_USER_ID_QUERY,
  FIND_LOCATIONS_BY_PACKAGE_ID_QUERY,
  FIND_LAST_LOCATION_BY_PACKAGE_ID_QUERY,
  FIND_ALL_LOCATIONS_QUERY,
} from '../services/location.queries';
import { Location } from '../types/location';

// filtros posibles
export type LocationFilters = {
  id?: string;
  userId?: string;
  packageId?: string;
  findLast?: boolean; 
};

export function useLocations(filters: LocationFilters) {

    const locationId = filters.id?.trim() ?? '';
  const userId = filters.userId?.trim() ?? '';
  const packageId = filters.packageId?.trim() ?? '';
  
  const hasId = !!locationId;
  const hasUserId = !!userId;
  const hasPackageId = !!packageId;
  const findLast = !!filters.findLast;

  const hasAnyFilter = hasId || hasUserId || hasPackageId;

  const { data: byIdData, loading: byIdLoading } = useQuery(FIND_LOCATION_BY_ID_QUERY, {
    variables: { id: locationId },
    skip: !hasId,
  });
  
  const { data: byUserData, loading: byUserLoading } = useQuery(FIND_LOCATIONS_BY_USER_ID_QUERY, {
    variables: { userId: userId },
    skip: !hasUserId,
  });

  const { data: byPackageIdData, loading: byPackageIdLoading } = useQuery(FIND_LOCATIONS_BY_PACKAGE_ID_QUERY, {
    variables: { packageId: packageId },
    skip: !hasPackageId || findLast, 
  });
  
  const { data: lastByPackageIdData, loading: lastByPackageIdLoading } = useQuery(FIND_LAST_LOCATION_BY_PACKAGE_ID_QUERY, {
    variables: { packageId: packageId },
    skip: !hasPackageId || !findLast, 
  });

  const { data: allData, loading: allLoading } = useQuery(FIND_ALL_LOCATIONS_QUERY, {
    skip: hasAnyFilter, 
  });

  const loading = byIdLoading || byUserLoading || byPackageIdLoading || lastByPackageIdLoading || allLoading;

  const rawLocations = useMemo<Location[]>(() => {
    if (!hasAnyFilter) {
      return allData?.findAllLocations || [];
    }

    const pool: Location[] = [
      ...(byIdData?.findLocationById ? [byIdData.findLocationById] : []),
      ...(byUserData?.findAllLocationsByUserId ?? []),
      ...(byPackageIdData?.findAllLocationsByPackageId ?? []),
      ...(lastByPackageIdData?.findLastLocationByPackageId ? [lastByPackageIdData.findLastLocationByPackageId] : []),
    ];
    
    return Array.from(new Map(pool.map(loc => [loc.id, loc])).values());
  }, [hasAnyFilter, allData, byIdData, byUserData, byPackageIdData, lastByPackageIdData]);

  const locations = useMemo(() => {
    const activeFilterCount = [hasId, hasUserId, hasPackageId].filter(Boolean).length;
    if (activeFilterCount <= 1) {
        return rawLocations;
    }

    return rawLocations.filter(loc => {
        if (hasId && loc.id !== locationId) return false;
        if (hasUserId && loc.handlerUser.id !== userId) return false;
        if (hasPackageId && loc.packageEntity.id !== packageId) return false;
        return true;
    });
  }, [rawLocations, hasId, hasUserId, hasPackageId, locationId, userId, packageId]);

  const error = [byIdData, byUserData, byPackageIdData, lastByPackageIdData, allData].find(res => res?.error)?.error;

  return { locations, loading, error };
}