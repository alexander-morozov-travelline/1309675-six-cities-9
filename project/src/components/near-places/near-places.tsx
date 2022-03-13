import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import React from 'react';
import {CardPlaceType, CardType} from '../../const';

type NearPlacesProperties = {
  offerList: Offers,
  setActiveOffer: (id: number | null) => void,
}

function NearPlaces(nearPlacesProperties: NearPlacesProperties):JSX.Element {
  const {offerList, setActiveOffer} = nearPlacesProperties;

  const handleMouseEnter = (id: number): void => {
    setActiveOffer(id);
  };

  const handleMouseLeave = (): void => {
    setActiveOffer(null);
  };
  return (
    <div className="near-places__list places__list">
      {
        offerList.map((offer) =>
          (
            <PlaceCard
              key={offer.id}
              cardType={CardType.Near}
              cardPlaceType={CardPlaceType.Near}
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

export default NearPlaces;
