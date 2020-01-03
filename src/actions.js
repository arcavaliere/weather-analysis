import {
    FETCH_WEATHER_STATIONS,
    FETCH_WEATHER_STATIONS_FOR_ACTIVE_STATE,
    CLEAR_WEATHER_STATIONS,
    SET_ACTIVE_STATION,
    SET_ACTIVE_STATE,
    FETCH_WEATHER_STATION_OBSERVATIONS,
    CALCULATE_MAX_OBSERVATIONS_REQUESTED,
    CALCULATE_MIN_OBSERVATIONS_REQUESTED
} from "./constants";

export function fetchWeatherStations(stateAbbreviations) {
    return {type: FETCH_WEATHER_STATIONS, stateAbbreviations}
}

export function fetchWeatherStationsForActiveState() {
    return {type: FETCH_WEATHER_STATIONS_FOR_ACTIVE_STATE}
}

export function fetchWeatherStationObservations(stationUrl) {
    return {type: FETCH_WEATHER_STATION_OBSERVATIONS, stationUrl}
}

export function clearWeatherStations() {
    return {type: CLEAR_WEATHER_STATIONS}
}

export function setActiveWeatherStation(activeStation) {
    return {type: SET_ACTIVE_STATION, activeStation}
}

export function setActiveState(activeState) {
    return { type: SET_ACTIVE_STATE, activeState }
}

export function requestMaxObservations(stationUrl, observations) {
    return { type: CALCULATE_MAX_OBSERVATIONS_REQUESTED, stationUrl, observations}
}

export function requestMinObservations(stationUrl, observations) {
    return { type: CALCULATE_MIN_OBSERVATIONS_REQUESTED, stationUrl, observations}
}