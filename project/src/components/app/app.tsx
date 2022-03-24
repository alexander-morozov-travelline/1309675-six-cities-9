import MainPage from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import React from 'react';
import Layout from '../layout/layout';
import Property from '../../pages/property/property';
import NotFound from '../../pages/not-found/not-found';
import Login from '../../pages/login/login';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';
import {useAppSelector} from '../../hooks/hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';

function App(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {isDataLoaded, offers, city} = useAppSelector(({OFFERS}) => OFFERS);

  if(!isDataLoaded) {
    return (<LoadingScreen />);
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.ItemOffer} element={<Property offers={offers} />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
