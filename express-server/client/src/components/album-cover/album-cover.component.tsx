import {FunctionComponent} from 'react';
import {useAppSelector} from '../../store/store';
import './album-cover.component.css';

interface IFunctionComponent {
}

const AlbumCoverComponent: FunctionComponent<IFunctionComponent> = () => {
    const hassUrl = 'http://homeassistant.local:8123';
    const currentAlbum = useAppSelector(state => state.albums.currentAlbum);
    return (
        <>
            {
                !currentAlbum ?
                    <>Loading...</> :
                    <img
                        className='album-cover__cover'
                        src={`${hassUrl}${currentAlbum.entity_picture}`}
                        alt="album art"
                        loading="eager"
                    />
            }
        </>
    )
}

export default AlbumCoverComponent;
