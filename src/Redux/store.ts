import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './Slices/contactSlices';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
  middleware: [logger],
});
