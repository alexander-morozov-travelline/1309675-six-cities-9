import {createReducer} from '@reduxjs/toolkit';
import {loadItemOffer, loadOffers, requireAuthorization, setCity, setOffers} from './action';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {City, Offer, Offers} from '../types/offer';

const initialState = {
  city: DEFAULT_CITY as City,
  offers: [] as Offers,
  itemOffer: undefined as Offer|null|undefined,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown as AuthorizationStatus,
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
    .addCase(loadItemOffer, (state, actions) => {
      state.itemOffer = actions.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });

});

export {reducer};
