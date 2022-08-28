import { combineReducers } from '@reduxjs/toolkit';

import { filterReducer } from './contacts/contacts-reducer';
import contactsReducer from './contacts/contacts-slice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
export default rootReducer;
