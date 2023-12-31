import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import account from './slices/accountInfoSlice';
import app from './slices/appSlice';

const reducers = {
  account,
  app
};

export const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'xlaunchpad-store',
  version: 1,
  storage,
  blacklist: ['account', 'app.impersonateAddress']
};

export const localStorageReducers = persistReducer(persistConfig, rootReducer);
