import { gql } from '@apollo/client';
import client from '../apolloClient';

const CREATE_VEHICLE_MUTATION = gql`
  mutation CreateVehicle($name: String!, $color: String!, $price: Float!, $year: String!) {
    createVehicle(fields: { name: $name, color: $color, price: $price, year: $year }) {
      objectId
      name
      color
      price
      year
    }
  }
`;

export async function createVehicle(name: string, color: string, price: number, year: string) {
  const { data } = await client.mutate({
    mutation: CREATE_VEHICLE_MUTATION,
    variables: { name, color, price, year }
  });
  return data.createVehicle;
}
