import express from 'express';
import fetch from 'node-fetch';
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})


app.get('/gas-prices', async (req, res) => {
    let responseCode = 0;
    const {municipio} = req.query;

    console.info(`/gas-prices endpoint reached with municipio as ${municipio}`)

    if (!municipio) {
        responseCode = 500;
        res.json({responseCode})
    }
    const { ListaEESSPrecio } = await fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${municipio}`)
        .then((res) => {
            responseCode = res.status;
            return res;
        })
        .then((res) => res.json());

    const [first, second, third] = ListaEESSPrecio?.filter(station => station['Precio Gasolina 95 E5'] !== '')
        .map((station) => {
            const latitud = station["Latitud"].replace(",",".");
            const longitud = station["Longitud (WGS84)"].replace(",",".");
            const mapa = "https://www.google.com/maps/dir/?api=1&destination=" + latitud + "," + longitud;
            const marca = station["Rótulo"];
            const precio = parseFloat(station['Precio Gasolina 95 E5'].replace(',', '.'));
            return {latitud, longitud, mapa, marca, precio};
        })
        .sort((a, b) => a.precio - b.precio)

    res.json({responseCode, first, second, third});
})
