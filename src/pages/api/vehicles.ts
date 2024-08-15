import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/apolloClient';
import { gql } from '@apollo/client';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, color, price, year } = req.body;

  try {
    const { data } = await client.mutate({
      mutation: CREATE_VEHICLE_MUTATION,
      variables: { name, color, price: parseFloat(price), year }
    });
    const newVehicle = data.createVehicle;
    res.status(201).json({ id: newVehicle.objectId, ...newVehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
