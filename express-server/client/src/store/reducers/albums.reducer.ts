import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HassEntity} from 'home-assistant-js-websocket';
import {RootState} from '../store';
import {MediaPlayer} from '../../interfaces/media-player.interface';

interface AlbumsReducer {
    albums: MediaPlayer[]
    currentAlbum: MediaPlayer | undefined;
    previousAlbum: MediaPlayer | undefined;
}

const initialState: AlbumsReducer = {
    albums: [],
    currentAlbum: undefined,
    previousAlbum: undefined,
}

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        addAlbums: (state, action: PayloadAction<MediaPlayer[]>) => {
          state.albums = action.payload;
        },
        addCurrentAlbum: (state, action: PayloadAction<MediaPlayer | undefined>) => {
            state.previousAlbum = state.currentAlbum;
            state.currentAlbum = action.payload;
        }
    }
});

export const {addAlbums, addCurrentAlbum} = albumsSlice.actions;

export default albumsSlice.reducer;
