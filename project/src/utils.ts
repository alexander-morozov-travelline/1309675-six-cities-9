import {Offer, OffersGroupByCity} from './types/offer';

export const groupOffersByCity = (offers: Offer[]): OffersGroupByCity => {
  let offersGroupByCityObj: {[property: string]: Offer[]} = {};
  let offersGroupByCity: OffersGroupByCity = [];

  offers.forEach((offer) => {
    if(typeof offersGroupByCityObj[offer.city.name] === 'undefined'){
      offersGroupByCityObj[offer.city.name] = [];
    }
    offersGroupByCityObj[offer.city.name].push(offer);
  });

  Object.entries(offersGroupByCityObj).forEach(([city, offers]) => {
    offersGroupByCity.push({city: city, offers: offers});
  });

  return offersGroupByCity;
}
