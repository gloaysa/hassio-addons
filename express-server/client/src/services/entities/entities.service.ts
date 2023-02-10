import {getStates, HassEntities, HassEntity} from 'home-assistant-js-websocket';
import {ConnectionService} from '../connection/connection.service';

export class EntitiesService {
    static getInstance(): EntitiesService {
        if (!this.instance) {
            this.instance = new EntitiesService();
            return this.instance
        }
        return this.instance;
    }
    private static instance: EntitiesService;

    private entities: HassEntity[] = [];

    constructor() {
        const connectionService = ConnectionService.getInstance();
        if (!connectionService.connection) {
            throw Error('Connection could not be established');
        }
        connectionService.connection()
            .then(async (connection) => {
                this.entities = await getStates(connection);
            });
    }

    allEntities(): HassEntity[] {
        return this.entities;
    }

    get mediaPlayer() {
        return this.entities;
    }
}
