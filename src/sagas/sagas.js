import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import { 
    FETCH_WEATHER_STATIONS_FAILED, 
    FETCH_WEATHER_STATIONS, 
    FETCH_WEATHER_STATIONS_SUCCEEDED,
    FETCH_WEATHER_STATION_OBSERVATIONS,
    FETCH_WEATHER_STATION_OBSERVATIONS_SUCCEEDED,
    FETCH_WEATHER_STATION_OBSERVATIONS_FAILED
} from "../constants";
import { apiCall, buildWeatherStationByStateQuery, filterWeatherStationIDS } from "../api/weather";

export const fetchWeatherStationsByState  = function* (state) {
    try {
        const response = yield call(apiCall, buildWeatherStationByStateQuery(state.stateAbbreviations));
        const stations = filterWeatherStationIDS(response)
        yield put ({type: FETCH_WEATHER_STATIONS_SUCCEEDED, stations})
    }
    catch (error) {
        yield put({type: FETCH_WEATHER_STATIONS_FAILED, error})
    }
}

const watchFetchWeatherStationsByState = function* () {
    yield takeLatest(FETCH_WEATHER_STATIONS, fetchWeatherStationsByState)
}

const fetchWeaterStationObservations = function* (state) {
    console.log(state)
    try {
        const response = yield call(apiCall, `${state.stationUrl}/observations`)
        yield put({type: FETCH_WEATHER_STATION_OBSERVATIONS_SUCCEEDED, stationId: state.stationUrl, observations: response.features})
    }
    catch (error) {
        yield put({type: FETCH_WEATHER_STATION_OBSERVATIONS_FAILED, stationId: state.stationUrl, error})
    }
}

const watchFetchWeatherStationObservations = function* () {
    yield takeEvery(FETCH_WEATHER_STATION_OBSERVATIONS, fetchWeaterStationObservations)
}

export default function* rootSaga() {
    yield all([
        watchFetchWeatherStationsByState(),
        watchFetchWeatherStationObservations()
    ])
}
