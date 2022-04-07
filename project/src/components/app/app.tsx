import MainPage from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Layout from '../layout/layout';
import Property from '../../pages/property/property';
import NotFound from '../../pages/not-found/not-found';
import Login from '../../pages/login/login';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';
import {useAppSelector} from '../../hooks/hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getLoadedDataStatus} from '../../store/offers-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  if(!isDataLoaded) {
    return (<LoadingScreen />);
  }

  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.ItemOffer} element={<Property />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <Favorites />
          </PrivateRoute>
        }
        />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
