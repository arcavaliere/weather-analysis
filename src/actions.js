import {
    FETCH_WEATHER_STATIONS,
    CLEAR_WEATHER_STATIONS
} from "./constants";

export function fetchWeatherStations(stateAbbreviations) {
    return {type: FETCH_WEATHER_STATIONS, stateAbbreviations}
}

export function clearWeatherStations() {
    return {type: CLEAR_WEATHER_STATIONS}
}