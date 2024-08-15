import { useQuery, gql } from '@apollo/client';
import client from '../lib/apolloClient';
import { useMemo, useState } from 'react';

// Define Interface
interface Vehicle {
  objectId: string;
  name: string;
  color: string;
  price: number;
  year: number;
}

interface VehiclesData {
  vehicles: {
    results: Vehicle[];
  };
}

const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      results {
        objectId
        name
        color
        price
        year
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery<VehiclesData>(GET_VEHICLES, { client });
  const [sortField, setSortField] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedVehicles = useMemo(() => {
    if (!data?.vehicles?.results) return [];
    return [...data.vehicles.results].sort((a, b) => {
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      return 0;
    });
  }, [data, sortField, sortOrder]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toggleSortOrder = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Vehicles</h1>
      {sortedVehicles.length === 0 ? (
        <p>No vehicles found</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {['name', 'color', 'price', 'year'].map(field => (
                <th
                  key={field}
                  onClick={() => toggleSortOrder(field)}
                  className="py-2"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedVehicles.map((vehicle: Vehicle) => (
              <tr key={vehicle.objectId}>
                <td className="border px-4 py-2">{vehicle.name}</td>
                <td className="border px-4 py-2">{vehicle.color}</td>
                <td className="border px-4 py-2">{vehicle.price}</td>
                <td className="border px-4 py-2">{vehicle.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
