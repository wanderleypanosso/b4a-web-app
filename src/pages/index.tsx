import { GetServerSideProps } from 'next';
import { GET_VEHICLES } from '../lib/vehicle/getVehicles';
import client from '../lib/apolloClient';
import { Vehicle } from '../lib/vehicle/types';

const Home = ({ vehicles }: { vehicles: Vehicle[] }) => {
  return (
    <div>
      <h1>List of Vehicles</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.objectId}>
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: GET_VEHICLES });

  return {
    props: {
      vehicles: data.vehicles.edges.map((edge) => edge.node),
    },
  };
};

export default Home;
