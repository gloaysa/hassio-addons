import {Router} from 'express';
import {CarburanteService} from '../../services/carburante/carburante.service';
import {Station} from '../../services/carburante/carburante.interface';
import {CheapestStationMapped, StationMapped} from './station-mapped.interface';

const gasStationsRouter = Router();

const carburanteService = CarburanteService.getInstance();

function mapGasStation(stations: Station[], priceCondition: string): StationMapped[] {
  // @ts-ignore
  return stations.filter(station => station[priceCondition] !== '')
    .map((station) => {
      const latitud = station.Latitud.replace(",", ".");
      const longitud = station["Longitud (WGS84)"].replace(",", ".");
      const mapa = "https://www.google.com/maps/dir/?api=1&destination=" + latitud + "," + longitud;
      const marca = station["Rótulo"];
      // @ts-ignore
      const precio = parseFloat(station[priceCondition].replace(',', '.'));
      return {latitud, longitud, mapa, marca, precio};
    })
    .sort((a, b) => a.precio - b.precio)
}

gasStationsRouter.get('/cheapest-three', async (req, res) => {
  let responseCode = 0;
  const {municipio, type } = req.query;
  let priceType = 'Precio Gasolina 95 E5';

  if (type === 'gasoil') {
    priceType = 'Precio Gasoleo A'
  }

  if (!municipio || typeof municipio !== 'string') {
    responseCode = 500;
    res.json({responseCode})
    return;
  }

  const {ListaEESSPrecio, ResultadoConsulta} = await carburanteService.municipalGasStations(municipio);

  const [first, second, third] = mapGasStation(ListaEESSPrecio, priceType)

  res.json({responseCode: ResultadoConsulta, first, second, third});
});

export default gasStationsRouter;
