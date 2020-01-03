import { 
    FETCH_WEATHER_STATIONS,
    FETCH_WEATHER_STATIONS_SUCCEEDED,
    FETCH_WEATHER_STATIONS_FAILED,
    CLEAR_WEATHER_STATIONS,
    SET_ACTIVE_STATION,
    SET_ACTIVE_STATE,
    FETCH_WEATHER_STATION_OBSERVATIONS,
    FETCH_WEATHER_STATION_OBSERVATIONS_SUCCEEDED,
    FETCH_WEATHER_STATION_OBSERVATIONS_FAILED,
    CALCULATE_MIN_OBSERVATIONS_REQUESTED,
    CALCULATE_MAX_OBSERVATIONS_REQUESTED,
    CALCULATE_MAX_OBSERVATIONS_SUCCEEDED,
    CALCULATE_MAX_OBSERVATIONS_FAILED,
    CALCULATE_MIN_OBSERVATIONS_SUCCEEDED,
    CALCULATE_MIN_OBSERVATIONS_FAILED
} from "./constants";
import { combineReducers } from 'redux';


const pendingRequestState = (state) => {
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

export function weatherStations(state = {requestStatus: 'INITIAL!', stations: [], activeStations: null, activeState: null, error: null}, action) {
    switch (action.type) {
        case FETCH_WEATHER_STATIONS:
            return pendingRequestState(state);
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
    return Object.assign({}, state,
        {
            [action.stationId]: 
                {
                    requestStatus: "SUCCESS!",
                    observations: action.observations
                }
        }
    )
}

const errorWeatherStationObservations = (state, action) => {
    return Object.assign({}, state, 
        {
            [action.stationId]: {
                requestStatus: "ERROR!",
                observations: [],
                error: action.error
            }
        }
    )
}

const pendingWeatherStationObservations = (state, action) => {
    return Object.assign({}, state,
        {
            [action.stationUrl]: {
                requestStatus: "PENDING!"
            }
        })
} 

const pendingMaxObservation = (state, action) => {
    return Object.assign({}, state,
        {
            [action.stationId]: Object.assign({}, state[action.stationId], {
                max: "PENDING!"
            })
        })
}

const maxObservationSucceeded = (state, action) => {
    return Object.assign({}, state,
        {
            [action.stationId]: Object.assign({}, state[action.stationId], {
                max: action.maxObservation
            })
        })
}

const maxObservationFailed = (state, action) => {
    return Object.assign({}, state,
        {
            [action.stationId]: Object.assign({}, state[action.stationId], {
                max: action.error
            })
        })
}

const pendingMinObservation = (state, action) => {
    return Object.assign({}, state,
        {
            [action.stationId]: Object.assign({}, state[action.stationId], {
                min: "PENDING!"
            })
        })
}

const minObservationSucceeded = (state, action) => {
    return Object.assign({}, state, 
        {
            [action.stationId]: Object.assign({}, state[action.stationId], {
                min: action.minObservation
            })
        })
}

const minObservationFailed = (state, action) => {
    return Object.assign({}, state,
        {
            [action.stationId]: Object.assign({}, state[action.stationId], {
                min: action.error
            })
        })
}

export function weatherStationObservations(state = [], action) {
    console.log(action.type)
    switch (action.type) {
        case FETCH_WEATHER_STATION_OBSERVATIONS:
            return pendingWeatherStationObservations(state, action);
        case FETCH_WEATHER_STATION_OBSERVATIONS_SUCCEEDED:
            return updateStationObservations(state, action);
        case FETCH_WEATHER_STATION_OBSERVATIONS_FAILED:
            return errorWeatherStationObservations(state, action);
        case CALCULATE_MIN_OBSERVATIONS_REQUESTED:
            return pendingMinObservation(state, action);
        case CALCULATE_MAX_OBSERVATIONS_REQUESTED:
            return pendingMaxObservation(state, action);
        case CALCULATE_MAX_OBSERVATIONS_SUCCEEDED:
            return maxObservationSucceeded(state, action);
        case CALCULATE_MAX_OBSERVATIONS_FAILED:
            return maxObservationFailed(state, action);
        case CALCULATE_MIN_OBSERVATIONS_SUCCEEDED:
            return minObservationSucceeded(state, action);
        case CALCULATE_MIN_OBSERVATIONS_FAILED:
            return minObservationFailed(state, action);
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    weatherStations,
    weatherStationObservations
})

