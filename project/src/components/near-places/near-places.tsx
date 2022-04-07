import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {CardPlaceType, CardType} from '../../const';

type NearPlacesProperties = {
  offerList: Offers,
}

function NearPlaces(nearPlacesProperties: NearPlacesProperties):JSX.Element {
  const {offerList} = nearPlacesProperties;

  return (
    <div className="near-places__list places__list" data-testid="near-places">
      {
        offerList.map((offer) =>
          (
            <PlaceCard
              key={offer.id}
              cardType={CardType.Near}
              cardPlaceType={CardPlaceType.Near}
              offer={offer}
            />
          ),
        )
      }
    </div>
  );
}

export default NearPlaces;
