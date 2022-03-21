import {Offers, Offer, OffersGroupByCity, Point} from './types/offer';
import CSS from 'csstype';
import dayjs from 'dayjs';
import {OfferTypeTitle, Sort, SortType} from './const';

export const groupOffersByCity = (offers: Offers): OffersGroupByCity => {
  const offersGroupByCityObj: {[property: string]: Offers} = {};
  const offersGroupByCity: OffersGroupByCity = [];

  offers.forEach((offer: Offer) => {
    if(typeof offersGroupByCityObj[offer.city.name] === 'undefined'){
      offersGroupByCityObj[offer.city.name] = [];
    }
    offersGroupByCityObj[offer.city.name].push(offer);
  });

  Object.entries(offersGroupByCityObj).forEach(([city, offerList]) => {
    offersGroupByCity.push({city: city, offers: offerList});
  });

  return offersGroupByCity;
};

export const getStyleWidthByRating = (rating: number): CSS.Properties => ({width: `${rating * 10}%`});

export const getFormattedDate = (date: dayjs.ConfigType, format: string) => dayjs(date).format(format);

export const getPointsFromOffers = (offers: Offers) => offers.map((offer: Offer): Point => (
  {
    id: offer.id,
    title: offer.title,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
  }
));

export const sortRatingDown = (offer1: Offer, offer2: Offer) =>
  offer1.rating < offer2.rating ? 1 : -1;

export const sortPriceLowToHigh = (offer1: Offer, offer2: Offer) =>
  offer1.price > offer2.price ? 1 : -1;

export const sortPriceHighToLow = (offer1: Offer, offer2: Offer) =>
  offer1.price < offer2.price ? 1 : -1;

export const getSortedOffers = (sortType: Sort, offers: Offers) => {
  const sortedOffers = [...offers];
  switch (sortType.type) {
    case SortType.PRICE_LOW_TO_HIGH:
      return sortedOffers.sort(sortPriceLowToHigh);
    case SortType.PRICE_HIGH_TO_LOW:
      return sortedOffers.sort(sortPriceHighToLow);
    case SortType.TOP_RATED:
      return sortedOffers.sort(sortRatingDown);
  }
  return sortedOffers;
};

export const getOfferTypeTitle = (type: string): string | null => {
  const offerTypeTitle = OfferTypeTitle.get(type);
  return offerTypeTitle ? offerTypeTitle : null;
};
