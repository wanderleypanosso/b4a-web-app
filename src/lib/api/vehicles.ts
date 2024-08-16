import { gql } from '@apollo/client';
import client from '../apolloClient';

const CREATE_VEHICLE_MUTATION = gql`
  mutation CreateObject($fields: VehicleCreateInput!) {
    createVehicle(input: { fields: $fields }) {
      vehicle {
        id
        name
        color
        price
        year
      }
    }
  }
`;

export async function createVehicle(name: string, color: string, price: number, year: string) {
  const { data } = await client.mutate({
    mutation: CREATE_VEHICLE_MUTATION,
    variables: { fields: { name, color, price, year } }
  });
  return data.createVehicle.vehicle;
}
