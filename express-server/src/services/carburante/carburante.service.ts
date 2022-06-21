import fetch, { Response } from 'node-fetch';
import {StationByProvince} from './carburante.interface';

export class CarburanteService {
  private apiUrl = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes';
  private static instance: CarburanteService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new CarburanteService();
      return this.instance;
    }
    return this.instance;
  }

  municipalGasStations(municipio: string): Promise<StationByProvince> {
    const url = `${this.apiUrl}/EstacionesTerrestres/FiltroMunicipio/${municipio}`;
    console.info(`GET ${url}`)
    return fetch(url).then((res: Response) => {
      const response = res.json();
      return response as unknown as StationByProvince;
    });
  }
}
