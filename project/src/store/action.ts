import {createAction} from '@reduxjs/toolkit';
import {City, Comments, Offer, Offers} from '../types/offer';
import {AppRoute} from '../const';

export const setCity = createAction<City>('city/set');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setItemOffer = createAction<Offer|null|undefined>('data/setItemOffer');

export const loadOfferComments = createAction<Comments>('data/loadOfferComments');

export const loadNearOffers = createAction<Offers>('data/loadNearOffers');

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');
