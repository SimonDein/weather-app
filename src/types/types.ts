export type Coordinates = {
  latitude: number;
  longitude: number;
};

export interface Location {
  name: string;
  coordinates: Coordinates | undefined;
  zipCode: string | undefined;
}
