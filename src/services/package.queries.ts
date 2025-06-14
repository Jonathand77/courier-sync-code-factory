import { gql } from '@apollo/client';

const PACKAGE_FIELDS = gql`
  fragment PackageFields on Package {
    id
    trackingCode
    description
    origin
    destination
    registeredAt
    status { id name }
    ownerUser { id name email }
  }
`;

export const FIND_PACKAGE_BY_TRACKING_CODE_QUERY = gql`
  query FindPackageByTrackingCode($trackingCode: String!) {
    findPackageByTrackingCode(trackingCode: $trackingCode) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS}
`;

export const FIND_PACKAGES_BY_STATUS_QUERY = gql`
  query FindPackagesByStatus($packageStatuses: [Int!]) {
    findPackagesByStatusIn(packageStatuses: $packageStatuses) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS}
`;

export const FIND_PACKAGES_BY_DATE_RANGE_QUERY = gql`
  query FindPackagesByDateRange($startDate: String, $endDate: String) {
    findPackagesByDateRange(startDate: $startDate, endDate: $endDate) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS}
`;

export const FIND_PACKAGE_BY_ID_QUERY = gql`
  query FindPackageById($id: ID!) {
    findPackageById(id: $id) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS}
`;

export const FIND_PACKAGES_BY_USER_ID_QUERY = gql`
  query FindPackagesByUserId($userId: ID!) {
    findAllPackagesByUserId(userId: $userId) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS}
`;

export const FIND_PACKAGES_BY_UBICATION_QUERY = gql`
  query FindPackagesByUbication($origin: String, $destination: String) {
    findAllPackagesByUbication(origin: $origin, destination: $destination) {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS}
`;

export const FIND_ALL_PACKAGES_QUERY = gql`
  query FindAllPackages {
    findAllPackages {
      ...PackageFields
    }
  }
  ${PACKAGE_FIELDS}
`;