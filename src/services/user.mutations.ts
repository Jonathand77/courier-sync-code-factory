import { gql } from '@apollo/client';

export const ADD_USER_MUTATION = gql`
  mutation AddUser($user: UserInput!) {
    addUser(user: $user) {
      id
      name
      email
      roleEntity { id }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      message # Asumimos que CustomResponse tiene 'message'
    }
  }
`;