import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {City, Offer, Offers} from '../../types/offer';

export const getCity = (state: State): City => state[NameSpace.Offers].city;
export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;
export const getItemOffer = (state: State): Offer | null | undefined => state[NameSpace.Offers].itemOffer;
export const getNearOffers = (state: State): Offers => state[NameSpace.Offers].nearOffers;
export const getFavorites = (state: State): Offers => state[NameSpace.Offers].favorites;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Offers].isDataLoaded;
