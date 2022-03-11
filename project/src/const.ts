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
