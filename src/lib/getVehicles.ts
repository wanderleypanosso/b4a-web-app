import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query getVehicles($limit: Int, $skip: Int) {
    vehicles(limit: $limit, skip: $skip) {
      results {
        objectId
        make
        model
        year
      }
    }
  }
`;
