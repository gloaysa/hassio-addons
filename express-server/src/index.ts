import express from 'express';

// const {ports} = require('../config.json');

import {CarburanteService} from './services/carburante/carburante.service';

const app = express()
const port = 3001;

const carburanteService = CarburanteService.getInstance();

app.get('/', (req, res) => {
  res.send(`Hello World!`)
})

app.listen((port), () => {
  console.info(`Express server listening on port ${port}`)
})


app.get('/gas-prices', async (req, res) => {
  let responseCode = 0;
  const {municipio} = req.query;

  if (!municipio || typeof municipio !== 'string') {
    responseCode = 500;
    res.json({responseCode})
    return;
  }

  const {ListaEESSPrecio} = await carburanteService.municipalGasStations(municipio);

  const [first, second, third] = ListaEESSPrecio?.filter(station => station['Precio Gasolina 95 E5'] !== '')
    .map((station) => {
      const latitud = station.Latitud.replace(",", ".");
      const longitud = station["Longitud (WGS84)"].replace(",", ".");
      const mapa = "https://www.google.com/maps/dir/?api=1&destination=" + latitud + "," + longitud;
      const marca = station["Rótulo"];
      const precio = parseFloat(station['Precio Gasolina 95 E5'].replace(',', '.'));
      return {latitud, longitud, mapa, marca, precio};
    })
    .sort((a, b) => a.precio - b.precio)

  res.json({responseCode, first, second, third});
})
