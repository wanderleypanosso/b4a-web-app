export type Vehicle = {
  objectId: string;
  make: string;
  model: string;
  year: number;
};

export interface VehicleEdges {
  edges: { node: Vehicle }[];
}
