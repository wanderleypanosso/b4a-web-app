import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query getVehicles {
    vehicles {
      edges {
        node {
          id
          name
          color
          price
          year
        }
      }
    }
  }
`;
