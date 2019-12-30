import { 
    FETCH_WEATHER_STATIONS,
    FETCH_WEATHER_STATIONS_SUCCEEDED,
    FETCH_WEATHER_STATIONS_FAILED,
    CLEAR_WEATHER_STATIONS,
    SET_ACTIVE_STATION,
    SET_ACTIVE_STATE,
    FETCH_WEATHER_STATION_OBSERVATIONS,
    FETCH_WEATHER_STATION_OBSERVATIONS_SUCCEEDED,
    FETCH_WEATHER_STATION_OBSERVATIONS_FAILED
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

const setActiveWeatherStation = (state, action) => {
    return Object.assign({},
        state,
        {activeStation: action.activeStation});
}

const setActiveState = (state, action) => {
    return Object.assign({}, state, {activeState: action.activeState})
}

export function weatherStations(state = {requestStatus: 'INITIAL!', stations: [], error: null}, action) {
    console.log(action.type)
    switch (action.type) {
        case FETCH_WEATHER_STATIONS:
            return pendingWeatherStationsState(state);
        case FETCH_WEATHER_STATIONS_SUCCEEDED:
            return addWeatherStations(state, action)
        case FETCH_WEATHER_STATIONS_FAILED:
            return errorWeatherStations(state, action);
        case CLEAR_WEATHER_STATIONS:
            return clearWeatherStations();
        case SET_ACTIVE_STATION:
            return setActiveWeatherStation(state, action)
        case SET_ACTIVE_STATE:
            return setActiveState(state, action)
        default:
            return state;
    }
}

const updateStationObservations = (state, action) => {
    return Object.assign({}, state, {observations: action.observations})
}

const errorWeatherStationObservations = (state, action) => {
    return Object.assign({}, state, {error: action.error})
}

export function weatherStationObservations(state = {requestStatus: 'INITIAL!', observations: [], activeStation: null, error: null}, action) {
    console.log(action.type)
    switch (action.type) {
        case FETCH_WEATHER_STATION_OBSERVATIONS:
            return pendingWeatherStationsState(state);
        case FETCH_WEATHER_STATION_OBSERVATIONS_SUCCEEDED:
            return updateStationObservations(state, action);
        case FETCH_WEATHER_STATION_OBSERVATIONS_FAILED:
            return errorWeatherStationObservations(state, action);
        default:
            return state;
    }
}


