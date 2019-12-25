import { 
    FETCH_WEATHER_STATIONS,
    FETCH_WEATHER_STATIONS_SUCCEEDED,
    FETCH_WEATHER_STATIONS_FAILED,
    CLEAR_WEATHER_STATIONS
} from "./constants";

const pendingWeatherStationsState = (state) => {
    return Object.assign({}, state, {requestStatus: 'PENDING!'})
}

const errorWeatherStations = (state, action) => {
    return Object.assign({}, state, {requestStatus: 'ERROR!', error: action.error})
}

const addWeatherStations = (state, action) => {
    return Object.assign({}, state,
        {
            requestStatus: 'SUCCESS!',
            stations: [...state.stations].concat(...action.stations)
        }); 
}

const clearWeatherStations = (state) => {
    return Object.assign({}, state, {requestStatus: 'CLEARED!', stations: [], error: null})
}

export function weatherStations(state = {requestStatus: 'INITIAL!', stations: [], error: null}, action) {
    switch (action.type) {
        case FETCH_WEATHER_STATIONS:
            return pendingWeatherStationsState(state);
        case FETCH_WEATHER_STATIONS_SUCCEEDED:
            return addWeatherStations(state, action)
        case FETCH_WEATHER_STATIONS_FAILED:
            return errorWeatherStations(state, action);
        case CLEAR_WEATHER_STATIONS:
            return clearWeatherStations();
        default:
            return state;
    }
}
