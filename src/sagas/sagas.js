import { call, put, takeLatest, all } from "redux-saga/effects";
import { 
    FETCH_WEATHER_STATIONS_FAILED, 
    FETCH_WEATHER_STATIONS, 
    FETCH_WEATHER_STATIONS_SUCCEEDED
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

export default function* rootSaga() {
    yield all([
        watchFetchWeatherStationsByState()
    ])
}
