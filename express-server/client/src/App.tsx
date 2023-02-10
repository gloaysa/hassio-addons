import "./App.css";
import {useEntites} from './hooks/use-connection.hook';

function App() {
    const hassUrl = 'http://supervisor/core';
    const mediaPlayers = useEntites();

    return (
        <div className="app" role="main">
            <article className="app__article">
                {
                    !mediaPlayers?.length ?
                        <>Loading...</> :
                        <img
                            className='app__album'
                            src={`${hassUrl}${mediaPlayers[0]?.attributes.entity_picture}`}
                            alt=""
                        />
                }

            </article>
        </div>
    );
}

export default App;
