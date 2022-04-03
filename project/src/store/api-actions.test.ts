import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {requireAuthorization} from './user-process/user-process';
import {APIRoute, FavoriteStatus} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {loadFavorites, loadNearOffers, loadOffers, setItemOffer, updateItemOffer} from './offers-data/offers-data';
import {loadOfferComments} from './comments-data/comments-data';
import {makeFakeCommentList, makeFakeOffer, makeFakeOffersList} from '../utils/mocks';
import {
  checkAuthAction,
  fetchFavoritesAction,
  fetchOfferDataAction,
  fetchOffersAction,
  loginAction,
  logoutAction
} from './api-actions';
import {FavoriteSetData} from '../types/offer';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch Load_Offers when GET /offers', async () => {
    const mockOffers = makeFakeOffersList();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch Load_Offer when GET /offer', async () => {
    const mockOffer = makeFakeOffer();
    const mockOffers = makeFakeOffersList();
    const mockComments = makeFakeCommentList();
    const OFFER_ID = '1';

    mockAPI
      .onGet(`${APIRoute.Offers}/${OFFER_ID}`)
      .reply(200, mockOffer)
      .onGet(`${APIRoute.Comments}/${OFFER_ID}`)
      .reply(200, mockComments)
      .onGet(`${APIRoute.Offers}/${OFFER_ID}/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOfferDataAction(OFFER_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setItemOffer.toString());
    expect(actions).toContain(loadOfferComments.toString());
    expect(actions).toContain(loadNearOffers.toString());
  });

  it('should dispatch Send_Comment when POST /comment', async () => {
    const mockComments = makeFakeCommentList();
    const RATING = 1;
    const fakeCommentSendData = {
      comment: 'test comment',
      rating: RATING,
    };
    const HOTEL_ID = '1';

    mockAPI
      .onGet(`${APIRoute.Comments}/${HOTEL_ID}`)
      .reply(200, fakeCommentSendData);

    const store = mockStore();

    await store.dispatch(loadOfferComments(mockComments));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOfferComments.toString());
  });

  it('should dispatch Load_favorites when GET /favorites', async () => {
    const mockOffers = makeFakeOffersList();

    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavorites.toString());
  });

  it('should dispatch SET_favorite when POST /favorite', async () => {
    const mockOffer = makeFakeOffer();
    const HOTEL_ID = 1;
    const favoriteSetData: FavoriteSetData = {hotelId: HOTEL_ID, status: FavoriteStatus.FAVORITE};

    mockAPI
      .onGet(`${APIRoute.Favorites}/${HOTEL_ID}/${FavoriteStatus.FAVORITE}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(updateItemOffer(favoriteSetData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(updateItemOffer.toString());
  });

});

