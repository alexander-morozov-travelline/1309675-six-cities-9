import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import React, {useState} from 'react';

type OfferListProps = {
  offerList: Offer[],
}

function OfferList(offerListProps: OfferListProps): JSX.Element {
  const {offerList} = offerListProps;
  const [activeOffer, setActiveOffer] = useState<null|number>(null);

  const handleMouseEnter = (id: number): void => {
    setActiveOffer(id);
  };

  const handleMouseLeave = (): void => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content" data-active-offer={activeOffer}>
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
