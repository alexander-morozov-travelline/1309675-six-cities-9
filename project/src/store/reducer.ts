import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from './action';
import {offers} from '../mocks/offers';

const DEFAULT_CITY = offers[0].city;

const initialState = {
  offers: offers,
  city: DEFAULT_CITY,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
