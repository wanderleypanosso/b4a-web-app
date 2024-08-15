import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query getVehicles {
    vehicles {
      edges {
        node {
          objectId
          make
          model
          year
        }
      }
    }
  }
`;
