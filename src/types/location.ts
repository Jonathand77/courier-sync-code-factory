interface LocationHandlerUser {
  id: string;
  name: string;
  email: string;
}

interface LocationPackage {
  id: string;
  trackingCode: string;
}

export interface Location {
  id: string;
  handlerUser: LocationHandlerUser;
  packageEntity: LocationPackage;
  latitude: number | null; 
  longitude: number | null;
  updatedAt: string; 
  address: string;
}

export type LocationFilters = {
  id?: string;
  userId?: string;
  packageId?: string;
};

export interface LocationCardProps {
  location: Location;
}