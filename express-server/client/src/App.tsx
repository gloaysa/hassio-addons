import "./App.css";
import {EntitiesService} from './services/entities/entities.service';
import {useCallback, useState} from 'react';
import {HassEntity} from 'home-assistant-js-websocket';

function App() {
    const entitiesService = EntitiesService.getInstance();
    const [entities, setEntities] = useState<HassEntity[]>([]);
    const getEntities = useCallback(() => {
         setEntities(entitiesService.allEntities());
    }, [entitiesService]);

    console.log(entities);

  return (
    <div className="App" role="main">
      <article className="App-article">
        <h3>Welcome</h3>
          <button onClick={getEntities}>Get entities</button>
      </article>
    </div>
  );
}

export default App;
