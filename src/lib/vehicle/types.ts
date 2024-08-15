export type Vehicle = {
  objectId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  location: string;
};

export interface VehicleEdges {
  edges: { node: Vehicle }[];
}
