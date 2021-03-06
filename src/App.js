import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/sagas";
import { rootReducer } from "./reducers"
import './App.css';
import {ConnectedWeatherStationDataDisplay ,ConnectedWeatherStationsSelector,ConnectedWeatherStationsByState } from './components/weatherContainer';
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

console.log(store.getState())

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <ConnectedWeatherStationsByState/>
      <ConnectedWeatherStationsSelector/>
      <ConnectedWeatherStationDataDisplay/>
      <button onClick={() => console.log(store.getState())}>
          Display State
        </button>
      {/* <div>
        <button onClick={() => store.dispatch(fetchWeatherStations(["NY"]))}>
          NYS Weather Station!
        </button>
        <button onClick={() => store.dispatch(clearWeatherStations())}>
          Clear Weather Stations!
        </button>
        <button onClick={() => console.log(store.getState())}>
          Display State
        </button>
        <button onClick={() => store.dispatch(setActiveState("NY"))}> Set NY Active</button>
      </div> */}
    </div>
    </Provider>
  );
}

export default App;
