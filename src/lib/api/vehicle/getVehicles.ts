import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { VehicleEdges } from './types';

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
  const { data } = await client.query<{ vehicles: VehicleEdges }>({
    query: GET_VEHICLES_QUERY,
    fetchPolicy: 'network-only', // Always fetch from the network, ensuring valid
  });
  return data.vehicles.edges.map((edge) => edge.node);
}
