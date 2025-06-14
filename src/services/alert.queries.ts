import { gql } from '@apollo/client';

const ALERT_FIELDS = gql`
  fragment AlertFields on Alert {
    id
    description
    registeredAt
    user { id name email }
    packageEntity { id trackingCode }
    alertTypeEntity { id name description }
  }
`;

export const FIND_ALL_ALERTS_QUERY = gql`
  query FindAllAlerts {
    findAllAlerts {
      ...AlertFields
    }
  }
  ${ALERT_FIELDS}
`;

export const FIND_ALERTS_BY_USER_ID_QUERY = gql`
  # Nota: el schema espera 'id' como argumento, pero nuestra variable se llama 'userId' para mayor claridad.
  query FindAlertsByUserId($userId: ID!) {
    findAllAlertsByUserId(id: $userId) {
      ...AlertFields
    }
  }
  ${ALERT_FIELDS}
`;