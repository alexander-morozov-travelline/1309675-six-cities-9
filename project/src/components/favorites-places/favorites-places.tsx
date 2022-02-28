import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import React from 'react';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesPlacesProps = {
  offers: Offer[],
}
function FavoritesPlaces(favoriteLocationProps: FavoritesPlacesProps): JSX.Element {
  const {offers} = favoriteLocationProps;
  return (
    <div className="favorites__places">
      {
        offers.map((offer) =>
          <FavoriteCard
            key={offer.id}
            offer={offer}
          />)
      }
    </div>
  );
}

export default FavoritesPlaces;
