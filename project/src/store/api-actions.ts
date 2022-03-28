import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../store';
import {store} from '../store';
import {redirectToRoute} from './action';
import {requireAuthorization, setUser} from './user-process/user-process';
import {loadOffers, setItemOffer, loadNearOffers, loadFavorites, updateItemOffer} from './offers-data/offers-data';
import {loadOfferComments} from './comments-data/comments-data';
import {saveToken, dropToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {CommentData, Comments, FavoriteSetData, Offer, Offers} from '../types/offer';

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
      store.dispatch(setItemOffer(data));
    } catch (error) {
      store.dispatch(setItemOffer(null));
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
      const {data} = await api.get<UserData>(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(setUser(data));
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
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(setUser(data));
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
      store.dispatch(setUser(null));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const sendCommentAction = createAsyncThunk(
  'comment/send',
  async ({commentDataForm, hotelId}: CommentData) => {
    try {
      const sendData = {
        comment: commentDataForm.review,
        rating: commentDataForm.rating,
      };
      const {data} = await api.post<Comments>(`${APIRoute.Comments}/${hotelId}`, sendData);
      store.dispatch(loadOfferComments(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/fetchFavorites',
  async () => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Favorites);
      store.dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavoriteAction = createAsyncThunk(
  'data/fetchFavorites',
  async ({hotelId, status}: FavoriteSetData) => {
    try {
      const {data: offer} = await api.post<Offer>(`${APIRoute.Favorites}/${hotelId}/${status}`);
      store.dispatch(updateItemOffer(offer));
    } catch (error) {
      errorHandle(error);
    }
  },
);
