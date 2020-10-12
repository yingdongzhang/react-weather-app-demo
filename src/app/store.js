import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import reducer from '../reducer'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer,
  middleware: [ sagaMiddleware ]
})

sagaMiddleware.run(rootSaga)
