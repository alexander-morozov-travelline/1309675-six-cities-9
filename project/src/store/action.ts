import {createAction} from '@reduxjs/toolkit';
import {City, Offers} from '../types/offer';

export const setCity = createAction<City>('city/set');

export const setOffers = createAction<Offers>('offers/set');
