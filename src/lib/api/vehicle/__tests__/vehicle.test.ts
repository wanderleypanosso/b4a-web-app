import { getVehicleSchema } from '../getVehicleSchema';
import { createVehicle } from '../createVehicle';
import { getVehicles } from '../getVehicles';

jest.mock('../../apolloClient');

describe('Vehicle API Functions', () => {
  test('getVehicleSchema returns schema fields', async () => {
    // Mocking the GraphQL response
    const mockData = {
      __type: {
        fields: [
          { name: 'name', type: { kind: 'SCALAR', name: 'String' }, description: 'required' },
          { name: 'color', type: { kind: 'SCALAR', name: 'String' }, description: 'optional' },
        ]
      }
    };

    require('../../apolloClient').default.query.mockResolvedValue({ data: mockData });

    const schema = await getVehicleSchema();
    expect(schema).toEqual(mockData.__type.fields);
  });

  test('createVehicle creates a new vehicle', async () => {
    const mockVehicle = {
      id: '123',
      name: 'Test Car',
      color: 'Red',
      price: 20000,
      year: '2022'
    };

    require('../../apolloClient').default.mutate.mockResolvedValue({ data: { createVehicle: { vehicle: mockVehicle } } });

    const vehicle = await createVehicle('Test Car', 'Red', 20000, '2022');
    expect(vehicle).toEqual(mockVehicle);
  });

  test('getVehicles returns list of vehicles', async () => {
    const mockVehicles = [
      { id: '1', name: 'Car 1', color: 'Red', price: 10000, year: '2021' },
      { id: '2', name: 'Car 2', color: 'Blue', price: 15000, year: '2020' },
    ];

    require('../../apolloClient').default.query.mockResolvedValue({ data: {vehicles: {edges: mockVehicles.map(vehicle => ({node: vehicle}))}} });

    const vehicles = await getVehicles();
    expect(vehicles).toEqual(mockVehicles);
  });
});
EOF && cat << 'EOF' > b4a-web-app/src/pages/__tests__/Home.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../index';

const mockVehicles = [
  { id: '1', name: 'Car 1', color: 'Red', price: 10000, year: '2021' },
  { id: '2', name: 'Car 2', color: 'Blue', price: 15000, year: '2020' },
];

const mockSchema = [
  { name: 'name', type: { kind: 'SCALAR', name: 'String' }, description: 'required' },
  { name: 'color', type: { kind: 'SCALAR', name: 'String' }, description: 'required' },
  { name: 'price', type: { kind: 'SCALAR', name: 'Float' }, description: 'required' },
  { name: 'year', type: { kind: 'SCALAR', name: 'String' }, description: 'required' },
];

describe('Home Component', () => {
  it('renders the form fields correctly', () => {
    render(<Home vehicles={mockVehicles} schema={mockSchema} />);
    
    // Check for form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
  });

  it('submits the form and shows the new vehicle', async () => {
    render(<Home vehicles={mockVehicles} schema={mockSchema} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Car' } });
    fireEvent.change(screen.getByLabelText(/color/i), { target: { value: 'Green' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: 30000 } });
    fireEvent.change(screen.getByLabelText(/year/i), { target: { value: '2023' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add vehicle/i }));

    // Check for the new vehicle in the list
    expect(await screen.findByText(/new car/i)).toBeInTheDocument();
    expect(screen.getByText(/2023/i)).toBeInTheDocument();
    expect(screen.getByText(/green/i)).toBeInTheDocument();
    expect(screen.getByText(/\$30000/i)).toBeInTheDocument();
  });
});
