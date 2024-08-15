import { GetServerSideProps } from 'next';
import { useState } from 'react';
import client from '../lib/apolloClient';
import { GET_VEHICLES } from '../lib/vehicle/getVehicles';
import { Vehicle, VehicleEdges } from '../lib/vehicle/types';
import { createVehicle } from '../lib/api/vehicles';

const Home = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const [localVehicles, setLocalVehicles] = useState(vehicles);
  const [form, setForm] = useState({ name: '', color: '', price: '', year: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = await createVehicle(form.name, form.color, parseFloat(form.price), form.year);
      setLocalVehicles((prev) => [...prev, newVehicle]);
      setForm({ name: '', color: '', price: '', year: '' });
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-primary text-3xl mb-8">List of Vehicles</h1>
      <form onSubmit={handleSubmit} className="w-11/12 md:w-2/3 lg:w-1/2 mb-8 p-4 bg-gray-800 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Color</label>
          <input
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Year</label>
          <input
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Add Vehicle</button>
      </form>

      <div className="w-11/12 md:w-2/3 lg:w-1/2">
        <ul>
          {localVehicles.map((vehicle) => (
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
