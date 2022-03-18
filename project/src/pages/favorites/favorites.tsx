import {Offer} from '../../types/offer';
import FavoritesList from '../../components/favorites-list/favorites-list';
import {groupOffersByCity} from '../../utils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

type FavoritesProps = {
  offers: Offer[],
}

function Favorites(favoritesProps: FavoritesProps): JSX.Element {
  const {offers} = favoritesProps;
  const offersGroupByCity = groupOffersByCity(offers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offersGroupByCity={offersGroupByCity}/>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Favorites;
