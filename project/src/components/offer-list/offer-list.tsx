import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import React from 'react';

type OfferListProps = {
  offerList: Offer[],
}
function OfferList(offerListProps: OfferListProps): JSX.Element {
  const {offerList} = offerListProps;
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offerList.map((offer) => <PlaceCard key={offer.id} offer={offer} />)
      }
    </div>
  );
}

export default OfferList;
