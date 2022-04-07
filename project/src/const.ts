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
  value: number,
  title: string,
}

export const RatesList: Rate[] = [
  {
    id: '5-stars',
    value: 5,
    title: 'perfect',
  },
  {
    id: '4-stars',
    value: 4,
    title: 'good',
  },
  {
    id: '3-stars',
    value: 3,
    title: 'not bad',
  },
  {
    id: '2-stars',
    value: 2,
    title: 'badly',
  },
  {
    id: '1-stars',
    value: 1,
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
    zoom: 11,
  },
  name: 'Paris',
};
export const CitiesList: City[] =  [
  DEFAULT_CITY,
  {
    location: {
      latitude: 50.9333300,
      longitude: 6.9500000,
      zoom: 11,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.8504500,
      longitude: 4.3487800,
      zoom: 11,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.3740300,
      longitude: 4.8896900,
      zoom: 11,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.5753200,
      longitude: 10.0153400,
      zoom: 11,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.2217200,
      longitude: 6.7761600,
      zoom: 11,
    },
    name: 'Dusseldorf',
  },
];

export const CityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const OfferTypes = ['apartment', 'room', 'house', 'hotel'];

export const SortType = {
  POPULAR: 'popular',
  PRICE_LOW_TO_HIGH: 'priceLowToHigh',
  PRICE_HIGH_TO_LOW: 'priceHighToLow',
  TOP_RATED: 'topRated',
};

type SortTypeKeys = keyof typeof SortType;

export type SortTypeId = typeof SortType[SortTypeKeys];

export type Sort = {
  type: SortTypeId,
  title: string,
};

export const DEFAULT_SORT = {
  type: SortType.POPULAR,
  title: 'Popular',
};

export const SortList: Sort[] = [
  DEFAULT_SORT,
  {
    type: SortType.PRICE_LOW_TO_HIGH,
    title: 'Price: low to high',
  },
  {
    type: SortType.PRICE_HIGH_TO_LOW,
    title: 'Price: high to low',
  },
  {
    type: SortType.TOP_RATED,
    title: 'Top rated first',
  },
];

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum APIRoute {
  Comments = '/comments',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels',
}

export const OfferTypeTitle = new Map([
  ['apartment', 'Apartment'],
  ['room', 'Private Room'],
  ['house', 'House'],
  ['hotel', 'Hotel'],
]);

export enum NameSpace {
  Offers = 'OFFERS',
  Comments = 'COMMENTS',
  User = 'USER',
}

export enum FavoriteStatus {
  NOT_FAVORITE = 0,
  FAVORITE = 1,
}

export enum BookmarkType {
  PlaceCard = 'place-card',
  Property  = 'property',
}

export enum CommentConfig {
  MinLength = 50,
  MaxLength = 300,
  MaxCount = 10,
}
