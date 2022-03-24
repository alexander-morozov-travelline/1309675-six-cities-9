import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {offersData} from './offers-data/offers-data';
import {commentsData} from './comments-data/comments-data';

export const rootReducer = combineReducers({
  [NameSpace.offers]: offersData.reducer,
  [NameSpace.comments]: commentsData.reducer,
  [NameSpace.user]: userProcess.reducer,
});
