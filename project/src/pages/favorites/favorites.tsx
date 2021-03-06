import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useEffect} from 'react';
import {fetchFavoritesAction} from '../../store/api-actions';
import {loadFavorites} from '../../store/offers-data/offers-data';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import FavoritesContent from '../../components/favorites-content/favorites-content';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import {getFavorites} from '../../store/offers-data/selectors';


function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);


  useEffect( () => {
    dispatch(fetchFavoritesAction());
    return () => {
      dispatch(loadFavorites([]));
    };
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      { favorites.length ? <FavoritesContent favorites={favorites} /> : <FavoritesEmpty  />}
      <Footer/>
    </div>
  );
}

export default Favorites;
