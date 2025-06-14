import { gql } from '@apollo/client';

const LOCATION_FIELDS = gql`
  fragment LocationFields on Location {
    id
    address
    latitude
    longitude
    updatedAt
    handlerUser { id name email }
    packageEntity { id trackingCode }
  }
`;

export const FIND_LOCATION_BY_ID_QUERY = gql`
  query FindLocationById($id: ID!) {
    findLocationById(id: $id) {
      ...LocationFields
    }
  }
  ${LOCATION_FIELDS}
`;

export const FIND_LOCATIONS_BY_USER_ID_QUERY = gql`
  query FindLocationsByUserId($userId: ID!) {
    findAllLocationsByUserId(userId: $userId) {
      ...LocationFields
    }
  }
  ${LOCATION_FIELDS}
`;

export const FIND_LOCATIONS_BY_PACKAGE_ID_QUERY = gql`
  query FindLocationsByPackageId($packageId: ID!) {
    findAllLocationsByPackageId(packageId: $packageId) {
      ...LocationFields
    }
  }
  ${LOCATION_FIELDS}
`;

export const FIND_LAST_LOCATION_BY_PACKAGE_ID_QUERY = gql`
  query FindLastLocationByPackageId($packageId: ID!) {
    findLastLocationByPackageId(packageId: $packageId) {
      ...LocationFields
    }
  }
  ${LOCATION_FIELDS}
`;

export const FIND_ALL_LOCATIONS_QUERY = gql`
  query FindAllLocations {
    findAllLocations {
      ...LocationFields
    }
  }
  ${LOCATION_FIELDS}
`;