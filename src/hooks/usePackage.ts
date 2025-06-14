import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import {
  FIND_PACKAGE_BY_TRACKING_CODE_QUERY,
  FIND_PACKAGES_BY_STATUS_QUERY,
  FIND_PACKAGES_BY_DATE_RANGE_QUERY,
  FIND_PACKAGE_BY_ID_QUERY,
  FIND_PACKAGES_BY_USER_ID_QUERY,
  FIND_PACKAGES_BY_UBICATION_QUERY,
  FIND_ALL_PACKAGES_QUERY,
} from '../services/package.queries';
import { Filters, Package } from '../types/package';

export function usePackages(filters: Filters) {

  const trackingCode = filters.trackingCode?.trim() ?? '';
  const packageId = filters.id?.trim() ?? '';
  const userId = filters.userId?.trim() ?? '';
  const origin = filters.origin?.trim() ?? '';
  const destination = filters.destination?.trim() ?? '';
  const statusIds = useMemo(() => filters.statusIds ?? [], [filters.statusIds]);
  const startDate = filters.startDate;
  const endDate = filters.endDate;

  const hasTracking = !!trackingCode;
  const hasId = !!packageId;
  const hasUserId = !!userId;
  const hasUbication = !!origin || !!destination;
  const hasStatuses = statusIds.length > 0;
  const hasDateRange = !!startDate || !!endDate;

  const hasAnyFilter = hasTracking || hasId || hasUserId || hasUbication || hasStatuses || hasDateRange;

    const { data: idData, loading: idLoading } = useQuery(FIND_PACKAGE_BY_ID_QUERY, {
    variables: { id: packageId },
    skip: !hasId,
  });

  const { data: trackingData, loading: trackingLoading } = useQuery(FIND_PACKAGE_BY_TRACKING_CODE_QUERY, {
    variables: { trackingCode },
    skip: !hasTracking,
  });
  
  const { data: statusData, loading: statusLoading } = useQuery(FIND_PACKAGES_BY_STATUS_QUERY, {
    variables: { packageStatuses: statusIds.map(Number) },
    skip: !hasStatuses,
  });
  
  const { data: dateData, loading: dateLoading } = useQuery(FIND_PACKAGES_BY_DATE_RANGE_QUERY, {
    variables: { startDate, endDate },
    skip: !hasDateRange,
  });

  const { data: userData, loading: userLoading } = useQuery(FIND_PACKAGES_BY_USER_ID_QUERY, {
    variables: { userId },
    skip: !hasUserId,
  });

  const { data: ubicationData, loading: ubicationLoading } = useQuery(FIND_PACKAGES_BY_UBICATION_QUERY, {
    variables: { origin, destination },
    skip: !hasUbication,
  });

  const { data: allData, loading: allLoading } = useQuery(FIND_ALL_PACKAGES_QUERY, {
    skip: hasAnyFilter, 
  });

  const loading = idLoading || trackingLoading || statusLoading || dateLoading || userLoading || ubicationLoading || allLoading;
  
  const rawPackages = useMemo<Package[]>(() => {
    if (!hasAnyFilter) {
      return allData?.findAllPackages || [];
    }

    const pool: Package[] = [
      ...(idData?.findPackageById ? [idData.findPackageById] : []),
      ...(trackingData?.findPackageByTrackingCode ? [trackingData.findPackageByTrackingCode] : []),
      ...(statusData?.findPackagesByStatusIn ?? []),
      ...(dateData?.findPackagesByDateRange ?? []),
      ...(userData?.findAllPackagesByUserId ?? []),
      ...(ubicationData?.findAllPackagesByUbication ?? []),
    ];
    
    // Quitar duplicados por id, crucial si un paquete coincide con varios filtros
    return Array.from(new Map(pool.map(p => [p.id, p])).values());
  }, [hasAnyFilter, allData, idData, trackingData, statusData, dateData, userData, ubicationData]);


  const packages = useMemo(() => {
    // Si solo se usó un filtro, los rawPackages ya son correctos.
    // Pero si hay múltiples, necesitamos filtrar.
    const activeFilterCount = [hasTracking, hasId, hasUserId, hasUbication, hasStatuses, hasDateRange].filter(Boolean).length;
    
    // Si no hay filtros o solo hay uno, no es necesario filtrar en el cliente
    if (activeFilterCount <= 1 && !hasAnyFilter) {
        return rawPackages;
    }

    // Si hay múltiples filtros activos, aplicamos todas las condiciones
    return rawPackages.filter(p => {
        if (hasTracking && p.trackingCode !== trackingCode) return false;
        if (hasId && p.id !== packageId) return false;
        if (hasUserId && p.ownerUser.id !== userId) return false;
        if (hasStatuses && !statusIds.map(Number).includes(Number(p.status.id))) return false;
        if (hasUbication) {
            if (origin && p.origin !== origin) return false;
            if (destination && p.destination !== destination) return false;
        }
        if (hasDateRange) {
            const d = new Date(p.registeredAt);
            if (startDate && d < new Date(startDate)) return false;
            if (endDate && d > new Date(endDate)) return false;
        }
        return true;
    });
  }, [
    rawPackages,
    hasTracking,
    hasId,
    hasUserId,
    hasUbication,
    hasStatuses,
    hasDateRange,
    trackingCode,
    packageId,
    userId,
    statusIds,
    origin,
    destination,
    startDate,
    endDate,
    hasAnyFilter
  ]);
  
  // Se devuelve el error de la primera query que falle
  const error = [idData, trackingData, statusData, dateData, userData, ubicationData, allData].find(res => res?.error)?.error;

  return { packages, loading, error };
}