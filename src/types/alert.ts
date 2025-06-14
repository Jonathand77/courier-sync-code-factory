interface AlertUser {
  id: string;
  name: string;
  email: string;
}

interface AlertPackage {
  id: string;
  trackingCode: string;
}

interface AlertType {
  id: string;
  name: string;
  description: string | null;
}

export interface Alert {
  id: string;
  user: AlertUser;
  packageEntity: AlertPackage;
  alertTypeEntity: AlertType;
  description: string;
  registeredAt: string;
}

export type AlertFilters = {
  userId?: string;
};

export interface AlertCardProps {
  alert: Alert;
}