export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface PackageStatus {
  id: string
  name: string
  description?: string
}

export interface Package {
  id: string
  trackingCode: string
  description: string
  origin: string
  destination: string
  registeredAt: string
  ownerUser: User
  status: PackageStatus
}


export interface User {
  id: string
  name: string
  email: string
}

export interface Filters {
  trackingCode?: string;
  id?: string;
  userId?: string;
  statusIds?: number[];
  startDate?: string;
  endDate?: string;
  origin?: string;
  destination?: string;
}