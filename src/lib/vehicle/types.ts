export type Vehicle = {
  id: string;
  name: string;
  color: string;
  price: number;
  year: number;
};

export interface VehicleEdges {
  edges: { node: Vehicle }[];
}
