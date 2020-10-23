// @flow
import { combineReducers } from 'redux';
import NavigationStateReducer from './navigation';
import CalendarReducer from './calendar';
import GridReducer from './grid';
import ChartsReducer from './charts';
// ## Generator Reducer Imports
import ChatReducer from './chat';
import GalleryReducer from './gallery';
import AuthReducer from './auth';
import BalanceStateReducer from './balance';
import SendReciveReducer from './sendRecive';

export default combineReducers({
  navigation: NavigationStateReducer,
  calendar: CalendarReducer,
  grid: GridReducer,
  charts: ChartsReducer,
  chat: ChatReducer,
  gallery: GalleryReducer,
  auth: AuthReducer,
  balance: BalanceStateReducer,
  sendRecive: SendReciveReducer
});
