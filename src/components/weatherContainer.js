import { dispatch } from "redux";
import { React } from "react"
import {FETCH_WEATHER_STATIONS} from "../constants"
import { Component } from "react";

export const DisplayWeather = ({temperature, windSpeed, pressure}) => {
    return (
        <div>
            <span value={temperature}/>
            <span value={windSpeed}/>
            <span value={pressure}/>
        </div>
    )
};

export const FetchWeatherStationsButton = ({onCLick}) => {
    return (
        <div>
            <button name="Get Weather Stations"
            onClick={e => {
                e.preventDefault()
                onCLick()
            }}/>
        </div>
    )
}

export const FetchWeatherStationsInput = () => {
    return (
        <div>
            <input value=""/>
        </div>
    )
}

// export const WeatherStationsList = ({stations}) => {
//     return (
//         <div>
//             <ul>
//                 {stations.map( (station) => 
//                     <li>
//                         {station.url}
//                     </li>
//                 )}
//             </ul>
//         </div>
//     )
// }