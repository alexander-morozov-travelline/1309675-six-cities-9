import {Offers} from '../../types/offer';
import {groupOffersByCity} from '../../utils';
import FavoritesList from '../favorites-list/favorites-list';

type FavoritesContentProps = {
  favorites: Offers
}
function FavoritesContent(favoritesContentProps: FavoritesContentProps): JSX.Element {
  const {favorites} = favoritesContentProps;
  const offersGroupByCity = groupOffersByCity(favorites);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList offersGroupByCity={offersGroupByCity}/>
        </section>
      </div>
    </main>
  );
}

export default FavoritesContent;
