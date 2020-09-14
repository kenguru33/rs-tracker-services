export interface AisdataCreatedEvent {
  id: string;
  mmsi: string;
  lat: number;
  lng: number;
  sog: number;
  cog: number;
  timeStamp: string;
}