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
    private connectionStarted = false;

    constructor() {
        this.hassUrl = 'http://homeassistant.local:8123';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYTEwOWIzMThmZTM0Y2Q5OGQ4YjJlMmMyZjgxOGJlNyIsImlhdCI6MTY3NjAzMzExMiwiZXhwIjoxOTkxMzkzMTEyfQ.xWTTmgNBIlbxyOvey2YG-4NhVScU-T51b1avKRDeBQ8';
    }

    async startConnection(): Promise<Connection | undefined> {
        if (this.connectionStarted) {
            return this._connection;
        }
        this.connectionStarted = true;
        const auth = createLongLivedTokenAuth(this.hassUrl, this.token);
        this._connection = await createConnection({auth});
        return this._connection;
    }

    async connection(): Promise<Connection | undefined> {
        return this._connection;
    }
}
