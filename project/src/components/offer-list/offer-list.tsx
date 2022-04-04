import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import React from 'react';
import {CardPlaceType, CardType} from '../../const';

type OfferListProps = {
  offerList: Offers,
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
    <div className="cities__places-list places__list tabs__content" data-testid="offer-list">
      {
        offerList.map((offer) =>
          (
            <PlaceCard
              key={offer.id}
              cardType={CardType.Cities}
              cardPlaceType={CardPlaceType.Cities}
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
