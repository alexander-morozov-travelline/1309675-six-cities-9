import {createReducer} from '@reduxjs/toolkit';
import {loadOffers, requireAuthorization, setCity, setOffers} from './action';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {City, Offers} from '../types/offer';

const initialState = {
  city: <City>DEFAULT_CITY,
  offers: <Offers>[],
  isDataLoaded: <boolean>false,
  authorizationStatus: <AuthorizationStatus>AuthorizationStatus.Unknown,
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
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });

});

export {reducer};
