import { registerAs } from '@nestjs/config';

export interface KystverketConfig {
  url: string;
  login: string;
  password: string;
  pullInterval: number;
}

export default () => ({
  kystverket: {
    url:
      'http://aisnorge.kystverket.no/ais/auth/requestServlet?REQUEST=ListTargets&layers=Aktive%20redningssk%C3%B8yter&INFO_FORMAT=application%2Fjson&CMR_FEATURE_ATTRIBUTES=MMSI,Destination,Decimal%20Latitude,Decimal%20Longitude,Ship%20name,Latitude,Longitude,SOG,COG,Time%20stamp',
    login: process.env.KYSTVERKET_LOGIN,
    password: process.env.KYSTVERKET_PASSWORD,
    interval: parseInt(process.env.INTERVAL, 10) || 30000,
  },
});
