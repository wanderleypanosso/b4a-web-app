import { gql } from '@apollo/client';
import client from '../../apolloClient';

const GET_VEHICLE_SCHEMA = gql`
  query GetVehicleSchema {
    __type(name: "Vehicle") {
      fields {
        name
        type {
          kind
          name
        }
        description
      }
    }
  }
`;

export async function getVehicleSchema() {
  const { data } = await client.query({ query: GET_VEHICLE_SCHEMA });
  const requiredFields = ['name', 'color', 'price', 'year'];

  return data.__type.fields.filter((field: any) => requiredFields.includes(field.name));
}
