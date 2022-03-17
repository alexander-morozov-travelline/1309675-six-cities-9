import {createReducer} from '@reduxjs/toolkit';
import {loadOffers, setCity, setOffers} from './action';
import {DEFAULT_CITY} from '../const';
import {Offers} from '../types/offer';

const initialState = {
  city: DEFAULT_CITY,
  offers: <Offers>[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffers, (state, actions) => {
      state.offers = actions.payload;
    });

});

export {reducer};
