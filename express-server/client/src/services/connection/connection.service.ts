import {Connection, createConnection, createLongLivedTokenAuth} from 'home-assistant-js-websocket';

export class ConnectionService {

    static getInstance(): ConnectionService {
        if (!this.instance) {
            this.instance = new ConnectionService();
            return this.instance
        }
        return this.instance;
    }
    private static instance: ConnectionService;
    private _connection: Connection | undefined;

    private readonly hassUrl;
    private readonly token;

    async connection(): Promise<Connection> {
        if (!this._connection) {
            const auth = createLongLivedTokenAuth(this.hassUrl, this.token);
            this._connection = await createConnection({auth});
        }
        return this._connection;
    }

    constructor() {
        this.hassUrl = '';
        this.token = ''
    }
}
