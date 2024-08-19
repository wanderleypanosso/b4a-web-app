export type Vehicle = {
  id: string;
  name: string;
  color: string;
  price: number;
  year: string;
};

export interface VehicleEdges {
  edges: { node: Vehicle }[];
}
