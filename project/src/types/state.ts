import {store} from '../store/index.js';
import {AuthorizationStatus} from '../const';
import {City, Comments, Offer, Offers} from './offer';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type OffersData = {
  city: City,
  offers: Offers,
  itemOffer: Offer|null|undefined,
  nearOffers: Offers,
  isDataLoaded: boolean,
}

export type CommentsData = {
  comments: Comments,
}
