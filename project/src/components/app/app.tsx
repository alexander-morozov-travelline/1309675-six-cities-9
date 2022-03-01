import MainPage from '../../pages/main-page/main-page';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import React from 'react';
import Layout from '../layout/layout';
import Property from '../../pages/property/property';
import NotFound from '../../pages/not-found/not-found';
import Login from '../../pages/login/login';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';
import {Offer} from '../../types/offer';

type AppProps = {
  offers: Offer[];
}
function App(props: AppProps): JSX.Element {
  const {offers} = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage offers={offers} />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.ItemOffer} element={<Property offers={offers} />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
