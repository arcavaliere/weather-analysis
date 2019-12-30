import React from "react";
import { connect } from "react-redux";
import { setActiveWeatherStation, setActiveState, fetchWeatherStations, fetchWeatherStationObservations } from "../actions";

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
        stateAbbreviation: state.activeState
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


const mapStateToProps = (state) => {
    return {
        stationList: state.stations,
        activeStation: state.activeStation
    }
}

const mapDispatchToProps = dispatch => {
   return {
        changeActiveStation: (event) => {
            dispatch(setActiveWeatherStation(event.target.value))
        },
        getStationObservations: (activeStation) => {
            console.log(activeStation)
            dispatch(fetchWeatherStationObservations(activeStation))
        }
    }
}
const ConnectedWeatherStationsSelector = connect(mapStateToProps, mapDispatchToProps)(WeatherStationsSelector);

export default ConnectedWeatherStationsSelector;