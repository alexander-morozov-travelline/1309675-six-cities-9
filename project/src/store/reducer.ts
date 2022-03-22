import {createReducer} from '@reduxjs/toolkit';
import {
  setItemOffer,
  loadNearOffers,
  loadOfferComments,
  loadOffers,
  requireAuthorization,
  setCity
} from './action';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {City, Comments, Offer, Offers} from '../types/offer';

const initialState = {
  city: DEFAULT_CITY as City,
  offers: [] as Offers,
  itemOffer: undefined as Offer|null|undefined,
  nearOffers: [] as Offers,
  comments: [] as Comments,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown as AuthorizationStatus,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, actions) => {
      state.offers = actions.payload;
      state.isDataLoaded = true;
    })
    .addCase(setItemOffer, (state, actions) => {
      state.itemOffer = actions.payload;
    })
    .addCase(loadOfferComments, (state, actions) => {
      state.comments = actions.payload;
    })
    .addCase(loadNearOffers, (state, actions) => {
      state.nearOffers = actions.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });

});

export {reducer};
