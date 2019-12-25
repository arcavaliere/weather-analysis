import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/sagas";
import { weatherStations } from "./reducers"
import './App.css';
import { fetchWeatherStations, clearWeatherStations } from './actions';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  weatherStations,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

console.log(store.getState())

function App() {
  return (
    <div className="App">
      <div>
        <button onClick={() => store.dispatch(fetchWeatherStations(["NY"]))}>
          NYS Weather Station!
        </button>
        <button onClick={() => store.dispatch(clearWeatherStations())}>
          Clear Weather Stations!
        </button>
        <button onClick={() => console.log(store.getState())}>
          Display State
        </button>
      </div>
    </div>
  );
}

export default App;
