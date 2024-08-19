import { GetServerSideProps } from 'next';
import { useState, ChangeEvent, FormEvent } from 'react';
import { getVehicles, createVehicle, getVehicleSchema } from '../lib/api/vehicle';
import { Vehicle } from '../lib/api/vehicle/types';

interface Field {
  name: string;
  type: {
    kind: string;
    name: string;
  };
  isRequired: boolean;
}

const Home = ({ vehicles, schema }: { vehicles: Vehicle[], schema: Field[] }) => {
  const [localVehicles, setLocalVehicles] = useState(vehicles);
  const [form, setForm] = useState<{ [key: string]: string | number }>({ name: '', color: '', price: '', year: '' });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!form.name || !form.color || !form.price || !form.year) {
        setError('All fields are required');
        return;
      }
      const newVehicle = await createVehicle(form.name as string, form.color as string, parseFloat(form.price as string), form.year as string);
      setLocalVehicles((prev) => [...prev, newVehicle]);
      setForm({ name: '', color: '', price: '', year: '' });
      setError('');
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setError('Error adding vehicle');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-primary text-3xl mb-8">List of Vehicles</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-11/12 md:w-2/3 lg:w-1/2 mb-8 p-4 bg-gray-800 rounded-lg">
        {schema.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm mb-2">{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
            <input
              type={field.type.name === 'Float' ? 'number' : 'text'}
              name={field.name}
              value={form[field.name] as string | number}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-900 text-white"
              required={field.isRequired}
            />
          </div>
        ))}
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
  const vehicles = await getVehicles();
  const schema = await getVehicleSchema();
  return {
    props: {
      vehicles,
      schema,
    },
  };
};

export default Home;
