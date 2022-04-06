import {createAsyncThunk} from '@reduxjs/toolkit';
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
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOfferDataAction',
  async (id: string, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(setItemOffer(data));
    } catch (error) {
      dispatch(setItemOffer(null));
      errorHandle(error);
      return;
    }

    try {
      api.get<Comments>(`${APIRoute.Comments}/${id}`).then( ({data}) => dispatch(loadOfferComments(data)) );
    } catch (error) {
      dispatch(loadOfferComments([] as Comments));
      errorHandle(error);
    }

    try {
      api.get(`${APIRoute.Offers}/${id}/nearby`).then( ({data}) => dispatch(loadNearOffers(data)) );
    } catch (error) {
      dispatch(loadNearOffers([] as Offers));
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch(error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}: AuthData, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const sendCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/send',
  async ({commentDataForm, hotelId}: CommentData, {dispatch, extra: api}) => {
    try {
      const sendData = {
        comment: commentDataForm.review,
        rating: commentDataForm.rating,
      };
      const {data} = await api.post<Comments>(`${APIRoute.Comments}/${hotelId}`, sendData);
      dispatch(loadOfferComments(data));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Favorites);
      dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavoriteAction = createAsyncThunk<void, FavoriteSetData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavorites',
  async ({hotelId, status}: FavoriteSetData, { dispatch, extra: api}) => {
    try {
      const {data: offer} = await api.post<Offer>(`${APIRoute.Favorites}/${hotelId}/${status}`);
      dispatch(updateItemOffer(offer));
    } catch (error) {
      errorHandle(error);
    }
  },
);
