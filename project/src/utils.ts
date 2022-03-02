import {Offer, OffersGroupByCity} from './types/offer';

export const groupOffersByCity = (offers: Offer[]): OffersGroupByCity => {
  const offersGroupByCityObj: {[property: string]: Offer[]} = {};
  const offersGroupByCity: OffersGroupByCity = [];

  offers.forEach((offer) => {
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
