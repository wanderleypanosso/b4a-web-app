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

export interface VehicleField {
  name: string;
  type: {
    kind: string;
    name: string;
  };
  description: string | null;
}
