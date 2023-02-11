import "./App.css";
import { FunctionComponent } from 'react';
import AlbumCoverComponent from './components/album-cover/album-cover.component';

const App: FunctionComponent = () => {

    return (
        <div className="app" role="main">
            <article className="app__article">
                <AlbumCoverComponent />
            </article>
        </div>
    );
}

export default App;
