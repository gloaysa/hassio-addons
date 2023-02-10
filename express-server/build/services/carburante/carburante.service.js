"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarburanteService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class CarburanteService {
    constructor() {
        this.apiUrl = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes';
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CarburanteService();
            return this.instance;
        }
        return this.instance;
    }
    municipalGasStations(municipio) {
        try {
            const url = `${this.apiUrl}/EstacionesTerrestres/FiltroMunicipio/${municipio}`;
            console.info(`GET ${url}`);
            return (0, node_fetch_1.default)(url).then((res) => {
                const response = res.json();
                return response;
            });
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.CarburanteService = CarburanteService;
//# sourceMappingURL=carburante.service.js.map