import { gql } from '@apollo/client';

const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    email
    roleEntity{
    id
    name
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    findAllUsers {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($id: ID!) {
    findUserById(id: $id) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;