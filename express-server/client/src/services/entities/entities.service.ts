import {Connection, HassEntity, subscribeEntities} from 'home-assistant-js-websocket';
import {ConnectionService} from '../connection/connection.service';
import {store} from '../../store/store';
import {Dispatch} from '@reduxjs/toolkit';
import {addCurrentAlbum} from '../../store/reducers/albums.reducer';
import {MediaPlayer} from '../../interfaces/media-player.interface';

export class EntitiesService {
    static getInstance(): EntitiesService {
        if (!this.instance) {
            this.instance = new EntitiesService();
            return this.instance
        }
        return this.instance;
    }
    private static instance: EntitiesService;

    constructor() {
        const connectionService = ConnectionService.getInstance();
        connectionService.connection()
            .then(async (connection) => {
                if (!connection) {
                    throw Error('Connection could not be established');
                }
                this.subscribeToEntities(connection);
            });
    }

    private subscribeToEntities(connection: Connection) {
        const dispatch = store.dispatch;
        subscribeEntities(connection, (ent) => {
            const entities: HassEntity[] = Object.values(ent);

            this.currentAlbums(this.getMediaPlayers(entities), dispatch);
        });
    }

    private currentAlbums(mediaPlayers: MediaPlayer[], dispatch: Dispatch) {
        const state = store.getState();
        const {currentAlbum} = state.albums;
        const selectedMediaPlayer = mediaPlayers?.[0];
        if (!selectedMediaPlayer) {
            return;
        }

        const mediaPlayerId = selectedMediaPlayer.media_content_id;
        const currentAlbumId = currentAlbum?.media_content_id;
        if (mediaPlayerId !== currentAlbumId) {
            dispatch(addCurrentAlbum(selectedMediaPlayer));
            return;
        }
    }

    private getMediaPlayers(entities: HassEntity[]): MediaPlayer[] {
        return entities.filter(({entity_id, state}) => entity_id.match(/^media_player.*/) && state === 'playing')
            .map(({attributes}) => attributes) as MediaPlayer[];
    }
}
