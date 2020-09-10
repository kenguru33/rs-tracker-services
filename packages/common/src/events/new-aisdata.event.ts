export interface NewAisdataEvent {
  mmsi: string;
  lat: number;
  lng: number;
  sog: number;
  cog: number;
  timeStamp: string;
}
