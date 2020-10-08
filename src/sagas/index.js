import { put, takeLatest, all } from 'redux-saga/effects'
import fetchWeatherApi from '../api/fetchWeatherApi'

function* fetchWeather(action) {
  const weather = yield fetchWeatherApi(action.payload.city)
  yield put({ type: 'WEATHER_FETCHED', payload: { weather } })
}

function* actionFetchWatcher() {
  yield takeLatest('FETCH_WEATHER', fetchWeather)
}

export default function* rootSaga() {
  yield all([
    actionFetchWatcher(),
  ]);
}
