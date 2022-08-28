import { createReducer } from '@reduxjs/toolkit';
import { filterChange } from './contacts-actions';

export const filterReducer = createReducer('', {
  [filterChange]: (_, action) => action.payload.toLowerCase().trim(),
});
