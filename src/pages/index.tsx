import { GetServerSideProps } from 'next';
import client from '../lib/apolloClient';
import { GET_VEHICLES } from '../lib/vehicle/getVehicles';
import { Vehicle, VehicleEdges } from '../lib/vehicle/types';

const Home = ({ vehicles }: { vehicles: Vehicle[] }) => {
  return (
    <div>
      <h1>List of Vehicles</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.name} ({vehicle.year}) - Color: {vehicle.color}, Price: ${vehicle.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<{ vehicles: VehicleEdges }>({ query: GET_VEHICLES });

  return {
    props: {
      vehicles: data.vehicles.edges.map((edge) => edge.node),
    },
  };
};

export default Home;
