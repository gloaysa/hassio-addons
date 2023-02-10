"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carburante_service_1 = require("../../../services/carburante/carburante.service");
const gasStationsRouter = (0, express_1.Router)();
const carburanteService = carburante_service_1.CarburanteService.getInstance();
function mapGasStation(stations, priceCondition) {
    // @ts-ignore
    return stations.filter(station => station[priceCondition] !== '')
        .map((station) => {
        const latitud = station.Latitud.replace(",", ".");
        const longitud = station["Longitud (WGS84)"].replace(",", ".");
        const mapa = "https://www.google.com/maps/dir/?api=1&destination=" + latitud + "," + longitud;
        const marca = station["Rótulo"];
        // @ts-ignore
        const precio = parseFloat(station[priceCondition].replace(',', '.'));
        return { latitud, longitud, mapa, marca, precio };
    })
        .sort((a, b) => a.precio - b.precio);
}
gasStationsRouter.get('/', (req, res, next) => {
    res.send("You have reached gasStationsRouter!");
});
gasStationsRouter.get('/cheapest-three', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let responseCode = 0;
    const { municipio, type } = req.query;
    let priceType = 'Precio Gasolina 95 E5';
    if (type === 'gasoil') {
        priceType = 'Precio Gasoleo A';
    }
    if (!municipio || typeof municipio !== 'string') {
        responseCode = 500;
        res.json({ responseCode, message: 'Please, provide a municipio' });
        res.status(500);
        res.end();
        return;
    }
    const { ListaEESSPrecio, ResultadoConsulta } = yield carburanteService.municipalGasStations(municipio);
    const [first, second, third] = mapGasStation(ListaEESSPrecio, priceType);
    res.json({ responseCode: ResultadoConsulta, first, second, third });
}));
exports.default = gasStationsRouter;
//# sourceMappingURL=gas-stations.router.js.map