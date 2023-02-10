"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gas_stations_router_1 = __importDefault(require("./gas-stations/gas-stations.router"));
const apiRouter = (0, express_1.Router)();
apiRouter.get('/', (req, res, next) => {
    res.send("You have reached the API!");
});
apiRouter.get('/a', (req, res) => {
    res.send("You have reached a");
});
apiRouter.use('/gas-stations', gas_stations_router_1.default);
exports.default = apiRouter;
//# sourceMappingURL=index.js.map