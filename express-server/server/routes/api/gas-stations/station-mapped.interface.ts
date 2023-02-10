export interface StationMapped {
  latitud: string;
  longitud: string;
  mapa: string;
  marca: string;
  precio: number;
}

export interface CheapestStationMapped {
  ['string']: StationMapped;
}
