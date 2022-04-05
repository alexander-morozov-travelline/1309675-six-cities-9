import FavoriteLocation from '../favorite-location/favorite-location';
import FavoritesPlaces from '../favorites-places/favorites-places';
import {OffersGroupByCity} from '../../types/offer';
import React from 'react';

type FavoritesListProps = {
  offersGroupByCity: OffersGroupByCity
}
function FavoritesList(favoritesListProps: FavoritesListProps): JSX.Element {
  const {offersGroupByCity} = favoritesListProps;
  return (
    <ul className="favorites__list" data-testid="favorites-list">
      {
        offersGroupByCity.map(
          ({city, offers}) =>
            (
              <li className="favorites__locations-items" key={city}>
                <FavoriteLocation locationName={city} />
                <FavoritesPlaces offers={offers} />
              </li>
            ),
        )
      }
    </ul>
  );
}

export default FavoritesList;
