import {City, Host, Location, Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    'id': 1,
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
    ],
    'host': {
      'avatarUrl': '/img/avatar-angelina.jpg',
      'id': 3,
      'isPro': true,
      'name': 'Angelina',
    },
    'images': [
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
    ],
    'isFavorite': true,
    'isPremium': true,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8,
    },
    'maxAdults': 4,
    'previewImage': '/img/apartment-small-03.jpg',
    'price': 120,
    'rating': 4.8,
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
  },
  {
    'id': 2,
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
    ],
    'host': {
      'avatarUrl': 'img/1.png',
      'id': 3,
      'isPro': true,
      'name': 'Angelina',
    },
    'images': [
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
    ],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8,
    },
    'maxAdults': 4,
    'previewImage': '/img/apartment-small-04.jpg',
    'price': 120,
    'rating': 4.8,
    'title': 'Wood and stone place',
    'type': 'private room',
  },
  {
    'id': 3,
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 10,
      },
      'name': 'Cologne',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
    ],
    'host': {
      'avatarUrl': 'img/1.png',
      'id': 3,
      'isPro': true,
      'name': 'Angelina',
    },
    'images': [
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
    ],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8,
    },
    'maxAdults': 4,
    'previewImage': '/img/apartment-small-03.jpg',
    'price': 120,
    'rating': 4.8,
    'title': 'Canal View Prinsengracht',
    'type': 'Apartment',
  },
]