import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../store';
import {store} from '../store';
import {
  requireAuthorization,
  redirectToRoute,
  loadOffers,
  loadItemOffer,
  loadOfferComments,
  loadNearOffers
} from './action';
import {saveToken, dropToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Comments, Offer, Offers} from '../types/offer';

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferDataAction = createAsyncThunk(
  'data/fetchOfferDataAction',
  async (id: string) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadItemOffer(data));
    } catch (error) {
      store.dispatch(loadItemOffer(null));
      errorHandle(error);
    }

    try {
      api.get<Comments>(`${APIRoute.Comments}/${id}`).then( ({data}) => store.dispatch(loadOfferComments(data)) );
    } catch (error) {
      store.dispatch(loadOfferComments([] as Comments));
      errorHandle(error);
    }

    try {
      api.get(`${APIRoute.Offers}/${id}/nearby`).then( ({data}) => store.dispatch(loadNearOffers(data)) );
    } catch (error) {
      store.dispatch(loadNearOffers([] as Offers));
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);
