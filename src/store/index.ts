import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import fetchLocationAutoCompleteEpic from './epics';

import locationSearchReducer from './reducer';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    'location-search': locationSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(fetchLocationAutoCompleteEpic);

export default store;
