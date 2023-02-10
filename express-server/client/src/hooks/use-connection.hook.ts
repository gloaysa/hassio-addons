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
    const hassUrl = 'ws://supervisor/core/websocket';
    const token = 'SUPERVISOR_TOKEN';
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
