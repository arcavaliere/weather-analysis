import {WEATHER_ENDPOINT} from "../constants";

export const apiCall = (endpoint) => {
    console.log(endpoint)
    return fetch(endpoint)
    .then(response => {
        return response.json();
    })
    .catch(response => {
        return {status: response.status, error: response.body}
    });
}

export const filterWeatherStationIDS = (weatherStationJSON) => {
    return weatherStationJSON.observationStations.map(station => {
            return {url: station}
        });
}

export const buildWeatherStationByStateQuery = (states) =>
{
    let baseString = `${WEATHER_ENDPOINT}stations?state=`;
    return baseString + states.reduce((cumulativeStates, state) => {
        return cumulativeStates + "," + state
    });
}
