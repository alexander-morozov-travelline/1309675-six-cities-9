import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import React, {useState} from 'react';

type OfferListProps = {
  offerList: Offer[],
}

function OfferList(offerListProps: OfferListProps): JSX.Element {
  const {offerList} = offerListProps;
  const [activeOffer, setActiveOffer] = useState(0);

  const handleMouseEnter = (id: number): void => {
    setActiveOffer(id);
  }

  const handleMouseLeave = (): void => {
    setActiveOffer(0);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offerList.map((offer) =>
          <PlaceCard
            key={offer.id}
            offer={offer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />)
      }
    </div>
  );
}

export default OfferList;
