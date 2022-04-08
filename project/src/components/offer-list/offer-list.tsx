import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {CardPlaceType, CardType} from '../../const';

type OfferListProps = {
  offerList: Offers,
  onSetActiveOffer: (id: number | null) => void,
}

function OfferList(offerListProps: OfferListProps): JSX.Element {
  const {offerList, onSetActiveOffer} = offerListProps;

  const handleMouseEnter = (id: number): void => {
    onSetActiveOffer(id);
  };

  const handleMouseLeave = (): void => {
    onSetActiveOffer(null);
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
