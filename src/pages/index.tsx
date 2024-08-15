import { GetServerSideProps } from 'next';
import client from '../lib/apolloClient';
import { GET_VEHICLES } from '../lib/vehicle/getVehicles';
import { Vehicle, VehicleEdges } from '../lib/vehicle/types';

const Home = ({ vehicles }: { vehicles: Vehicle[] }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-primary text-3xl mb-8">List of Vehicles</h1>
      <div className="w-11/12 md:w-2/3 lg:w-1/2">
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} className="mb-4">
              <span className="block text-lg">{vehicle.name} ({vehicle.year})</span>
              <span className="block text-sm text-gray-400">Color: {vehicle.color}, Price: ${vehicle.price}</span>
            </li>
          ))}
        </ul>
      </div>
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
