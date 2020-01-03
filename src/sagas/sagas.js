import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import { 
    FETCH_WEATHER_STATIONS_FAILED, 
    FETCH_WEATHER_STATIONS, 
    FETCH_WEATHER_STATIONS_SUCCEEDED,
    FETCH_WEATHER_STATION_OBSERVATIONS,
    FETCH_WEATHER_STATION_OBSERVATIONS_SUCCEEDED,
    FETCH_WEATHER_STATION_OBSERVATIONS_FAILED,
    CALCULATE_MAX_OBSERVATIONS_FAILED,
    CALCULATE_MAX_OBSERVATIONS_SUCCEEDED,
    CALCULATE_MIN_OBSERVATIONS_SUCCEEDED,
    CALCULATE_MIN_OBSERVATIONS_FAILED,
    CALCULATE_MIN_OBSERVATIONS_REQUESTED,
    CALCULATE_MAX_OBSERVATIONS_REQUESTED
} from "../constants";
import { apiCall, buildWeatherStationByStateQuery, filterWeatherStationIDS } from "../api/weather";
import * as stats from "simple-statistics";

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

const runMinWeatherObservations = function* (state) {
    try {
        const minObservation = yield call( stats.min, state.observations);
        yield put({type: CALCULATE_MIN_OBSERVATIONS_SUCCEEDED, stationId: state.stationUrl, minObservation})
    }
    catch( error ){
        yield put({type: CALCULATE_MIN_OBSERVATIONS_FAILED, stationId: state.stationUrl, error})
    }
}

const watchRunMinWeatherObservations = function* () {
    yield takeEvery(CALCULATE_MIN_OBSERVATIONS_REQUESTED, runMinWeatherObservations)
}

const runMaxWeatherObservations = function* (state) {
    try {
        const maxObservation = yield call(stats.max, state.observations);
        yield put({type: CALCULATE_MAX_OBSERVATIONS_SUCCEEDED, stationId: state.stationUrl, maxObservation})
    }
    catch( error ){
        yield put({type: CALCULATE_MAX_OBSERVATIONS_FAILED, stationId: state.stationUrl, error})
    }
}

const watchRunMaxWeatherObservations = function* () {
    yield takeEvery(CALCULATE_MAX_OBSERVATIONS_REQUESTED, runMaxWeatherObservations)
}

export default function* rootSaga() {
    yield all([
        watchFetchWeatherStationsByState(),
        watchFetchWeatherStationObservations(),
        watchRunMaxWeatherObservations(),
        watchRunMinWeatherObservations()
    ])
}