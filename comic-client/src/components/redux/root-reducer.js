import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import snackbarReducer from './snackbar/snackbar-reducer';
import userReducer from './user/user-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
});

export default persistReducer(persistConfig, rootReducer);
