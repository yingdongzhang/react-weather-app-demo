import { all } from 'redux-saga/effects'
import { actionFetchWatcher } from './weather.saga'

export default function* rootSaga() {
  yield all([
    actionFetchWatcher(),
  ]);
}
