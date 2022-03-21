import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Offers} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';

export const setCity = createAction<City>('city/set');

export const setOffers = createAction<Offers>('offers/set');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadItemOffer = createAction<Offer|null>('data/loadItemOffer');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');
