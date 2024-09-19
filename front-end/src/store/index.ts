import { configureStore, combineReducers } from '@reduxjs/toolkit';
import navReducer from './nav';
import modalReducer from './modal';
import pageReducer from './page';
import fitnessreducer from './fitness';

import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storageSession from 'redux-persist/lib/storage/session';

const reducers = combineReducers({
  nav: navReducer,
  modal: modalReducer,
  page: pageReducer,
  fitness: fitnessreducer,
});

const persistConfig = {
  key: 'redux-state',
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
