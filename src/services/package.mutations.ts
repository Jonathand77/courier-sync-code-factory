import { gql } from '@apollo/client';

export const ADD_PACKAGE_MUTATION = gql`
  mutation AddPackage($packageEntity: InputPackageAdd!) {
    addPackage(packageEntity: $packageEntity) {
      id
      trackingCode
      description
      origin
      destination
    }
  }
`;

export const UPDATE_PACKAGE_MUTATION = gql`
  mutation UpdatePackage($packageEntity: InputPackageUpdate!) {
    updatePackage(packageEntity: $packageEntity) {
      status
      message
    }
  }
`;

export const DELETE_PACKAGE_MUTATION = gql`
  mutation DeletePackage($id: ID!) {
    deletePackageById(id: $id) {
      status
      message
    }
  }
`;