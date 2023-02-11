import {useEffect, useState} from 'react';
import {
    Connection,
    HassEntity,
    subscribeEntities
} from 'home-assistant-js-websocket';

export const useEntities = (connection: Connection | undefined): HassEntity[] => {
    const [mediaPlayers, setMediaPlayers] = useState<HassEntity[]>([]);

    useEffect(() => {
        if (!connection) {
            console.log('!connection')
            return;
        }
        let lastPlaying: HassEntity[] = [];

    }, [connection]);


    return mediaPlayers;
}
