import {datatype, lorem, date, internet} from 'faker';
import {City, Offer, Comment, Offers, Comments, User} from '../types/offer';
import {cityNames, offerTypes} from '../const';
import {getRandValFromArray} from './common';

const OFFERS_COUNT = 3;
const GOOODS_COUNT = 3;
const IMAGES_COUNT = 3;
const COMMENTS_COUNT = 3;

export const makeFakeOffersList = (): Offers => Array.from(Array(OFFERS_COUNT), () => makeFakeOffer());

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
    name: getRandValFromArray(cityNames) as string,
  },
  description: lorem.sentence(),
  goods: Array.from(Array(GOOODS_COUNT), () => lorem.word()),
  host:{
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
  id: datatype.number(),
  images: Array.from(Array(IMAGES_COUNT), () => internet.avatar()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: internet.avatar(),
  price: datatype.number(),
  rating: datatype.float(),
  title: lorem.sentence(),
  type: getRandValFromArray(offerTypes) as string,
});

export const makeFakeUser = (): User => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
});

export const makeFakeComment = (): Comment => ({
  comment: lorem.paragraph(),
  date: date.past(1).toString(),
  id: datatype.number(),
  rating: datatype.float(),
  user: makeFakeUser(),
});

export const makeFakeCommentList = (): Comments => Array.from(Array(COMMENTS_COUNT), () => makeFakeComment());

export const makeFakeCity = (): City => ({
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  name: getRandValFromArray(cityNames) as string,
});

