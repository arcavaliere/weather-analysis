import React from "react";
import { connect } from "react-redux";
import { setActiveWeatherStation, setActiveState, fetchWeatherStations, fetchWeatherStationObservations, requestMinObservations, requestMaxObservations } from "../actions";

const WeatherStationsByState = ({stateAbbreviation, changeActiveState, getWeatherStationsByState}) => {
    return (
        <div>
            <input type="text" value={stateAbbreviation} onChange={changeActiveState}/>
            <button onClick={(e) => getWeatherStationsByState(stateAbbreviation, e)}>Get Weather Stations</button>
        </div>
    );
}

const changeActiveState = (event) => {
    return setActiveState(event.target.value);
}

const getWeatherStationsByState = (state, event) => {
    return fetchWeatherStations([state])
}

const mapWeatherStationsByStateToProps = (state) => {
    return {
        stateAbbreviation: state.weatherStations.activeState
    }
}

const mapWeatherStationsByStateDispatchToProps = {
    changeActiveState,
    getWeatherStationsByState
}

export const ConnectedWeatherStationsByState = connect(mapWeatherStationsByStateToProps, mapWeatherStationsByStateDispatchToProps)(WeatherStationsByState);

// WEATHER STATIONS
const WeatherStationsSelector = ({stationList, activeStation, changeActiveStation, getStationObservations}) => {
    return (
        <div>
        <select value={activeStation} onChange={changeActiveStation}>
            {stationList.map(station => {
                return <option key={station.url} value={station.url}>{station.url}</option>
            })}
        </select>
        <button onClick={(e) => getStationObservations(activeStation)}>Get Station Observations!</button>
        </div>
    )
}


const mapStateToPropsWeatherStationsSelector = (state) => {
    return {
        stationList: state.weatherStations.stations,
        activeStation: state.weatherStations.activeStation
    }
}

const mapDispatchToPropsWeatherStationsSelector = dispatch => {
   return {
        changeActiveStation: (event) => {
            dispatch(setActiveWeatherStation(event.target.value))
        },
        getStationObservations: (activeStation) => {
            dispatch(fetchWeatherStationObservations(activeStation))
        }
    }
}
export const ConnectedWeatherStationsSelector = connect(mapStateToPropsWeatherStationsSelector, mapDispatchToPropsWeatherStationsSelector)(WeatherStationsSelector);


const WeatherStationDataDisplay = ({weatherStationObservations, displayStats}) => {
    return (
        <div>
            <ul>
                {Object.keys(weatherStationObservations).map( stationURL => {
                    return <div>
                    <li key={stationURL}>
                        <ul>
                            <li key={stationURL}>{stationURL}</li>
                            <li key={weatherStationObservations[stationURL].min} value={weatherStationObservations[stationURL].min}>MIN: {weatherStationObservations[stationURL].min}</li>
                            <li key={weatherStationObservations[stationURL].max} value={weatherStationObservations[stationURL].max}>MAX: {weatherStationObservations[stationURL].max}</li>
                        </ul>
                    </li>
                    <button onClick={(e) => {
                            if(weatherStationObservations[stationURL].requestStatus !== "PENDING"){
                            displayStats(stationURL, 
                            weatherStationObservations[stationURL].observations.map( data => {
                                return data.properties.temperature.value;
                        }))}}}>Get Stats!</button>
                </div>
                })}
            </ul>
        </div>
    )
}

const mapStateToPropsWeatherStationDataDisplay = (state) => {
    const {weatherStationObservations} = state;
    console.log(state)
    console.log(Object.keys(weatherStationObservations))
    return {weatherStationObservations};
}

const mapDispatchToPropsWeatherStationDataDisplay = dispatch => {
    return {
        displayStats: (stationUrl, observations) => {
            dispatch(requestMinObservations(stationUrl, observations))
            dispatch(requestMaxObservations(stationUrl, observations))
        }
    }
}

export const ConnectedWeatherStationDataDisplay = connect(mapStateToPropsWeatherStationDataDisplay, mapDispatchToPropsWeatherStationDataDisplay)(WeatherStationDataDisplay);
