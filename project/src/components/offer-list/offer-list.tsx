import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import React from 'react';

type OfferListProps = {
  offerList: Offer[],
  setActiveOffer: (id: number | null) => void,
}

function OfferList(offerListProps: OfferListProps): JSX.Element {
  const {offerList, setActiveOffer} = offerListProps;

  const handleMouseEnter = (id: number): void => {
    setActiveOffer(id);
  };

  const handleMouseLeave = (): void => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offerList.map((offer) =>
          (
            <PlaceCard
              key={offer.id}
              offer={offer}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ),
        )
      }
    </div>
  );
}

export default OfferList;
