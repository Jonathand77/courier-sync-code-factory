import { gql } from '@apollo/client';

export const ADD_LOCATION_MUTATION = gql`
  mutation AddLocation($location: InputLocationAdd!) {
    addLocation(location: $location) {
      id
      address
    }
  }
`;

export const UPDATE_LOCATION_MUTATION = gql`
  mutation UpdateLocation($location: InputLocationUpdate!) {
    updateLocation(location: $location) {
      message # Asumimos que CustomResponse tiene un campo 'message'
    }
  }
`;

export const DELETE_LOCATION_MUTATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocationById(id: $id) {
      message
    }
  }
`;
