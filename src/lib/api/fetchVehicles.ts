import { gql } from '@apollo/client';
import client from '../apolloClient';

const GET_VEHICLES_QUERY = gql`
  query GetVehicles {
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

export async function getVehicles() {
  const { data } = await client.query({ query: GET_VEHICLES_QUERY });
  return data.vehicles.edges.map((edge) => edge.node);
}
