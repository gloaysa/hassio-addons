import {useCallback, useState} from 'react';
import {
    Connection,
    createConnection,
    createLongLivedTokenAuth,
    HassEntity,
    subscribeEntities
} from 'home-assistant-js-websocket';

export const useConnection = (): Connection | undefined => {
    const [connection, setConnection] = useState<Connection | undefined>();
    const hassUrl = 'http://homeassistant.local:8123';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYTEwOWIzMThmZTM0Y2Q5OGQ4YjJlMmMyZjgxOGJlNyIsImlhdCI6MTY3NjAzMzExMiwiZXhwIjoxOTkxMzkzMTEyfQ.xWTTmgNBIlbxyOvey2YG-4NhVScU-T51b1avKRDeBQ8';
    const connect = useCallback(async () => {
        const auth = createLongLivedTokenAuth(hassUrl, token);
        const conn = await createConnection({auth});
        setConnection(conn);
    }, []);
    if (connection) {
        return connection;
    } else {
        connect();
    }
}

export const useEntites = (): HassEntity[] => {
    const connection = useConnection();
    const [mediaPlayers, setMediaPlayers] = useState<HassEntity[]>([]);
    if (!connection) {
        return [];
    }

    subscribeEntities(connection, (ent) => {
        const playing = Object.values(ent)
            .filter(({entity_id, state}) => entity_id.match(/^media_player.*/) && state === 'playing');
        if (playing?.[0]?.attributes.entity_picture !== mediaPlayers?.[0]?.attributes.entity_picture) {
            setMediaPlayers(playing);
        }
    });
    return mediaPlayers;
}
