import { GetServerSideProps } from 'next';
import client from '../lib/apolloClient';
import { GET_VEHICLES } from '../lib/vehicle/getVehicles';
import { Vehicle, VehicleEdges } from '../lib/vehicle/types';

const Home = ({ vehicles }: { vehicles: Vehicle[] }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '2rem' }}>List of Vehicles</h1>
      <div style={{ width: '80%', maxWidth: '800px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Name</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Year</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Color</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                <td style={{ padding: '0.5rem' }}>{vehicle.name}</td>
                <td style={{ padding: '0.5rem' }}>{vehicle.year}</td>
                <td style={{ padding: '0.5rem' }}>{vehicle.color}</td>
                <td style={{ padding: '0.5rem' }}>${vehicle.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
