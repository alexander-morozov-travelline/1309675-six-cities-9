import {City} from './types/offer';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  ItemOffer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

type Rate = {
  id: string,
  value: string,
  title: string,
}

export const RateList: Rate[] = [
  {
    id: '5-stars',
    value: '5',
    title: 'perfect',
  },
  {
    id: '4-stars',
    value: '4',
    title: 'good',
  },
  {
    id: '3-stars',
    value: '3',
    title: 'not bad',
  },
  {
    id: '2-stars',
    value: '2',
    title: 'badly',
  },
  {
    id: '1-stars',
    value: '1',
    title: 'terribly',
  },
];

export const URL_MARKER_DEFAULT = './img/pin.svg';
export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const CardType = {
  Cities: 'cities',
  Near: 'near-places',
  Favorites: 'favorites',
};

export const CardPlaceType = {
  Cities: 'cities__place-card',
  Near: 'near-places__card',
  Favorites: 'favorites__card',
};

export const DEFAULT_CITY: City =   {
  location: {
    latitude: 48.8534100,
    longitude: 2.3488000,
    zoom: 10,
  },
  name: 'Paris',
};
export const CitiesList: City[] =  [
  DEFAULT_CITY,
  {
    location: {
      latitude: 50.9333300,
      longitude: 6.9500000,
      zoom: 10,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.8504500,
      longitude: 4.3487800,
      zoom: 10,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.3740300,
      longitude: 4.8896900,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.5753200,
      longitude: 10.0153400,
      zoom: 10,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.2217200,
      longitude: 6.7761600,
      zoom: 10,
    },
    name: 'Dusseldorf',
  },
];
