import {Offers, Offer, OffersGroupByCity, Point} from './types/offer';
import CSS from 'csstype';
import dayjs from 'dayjs';

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
