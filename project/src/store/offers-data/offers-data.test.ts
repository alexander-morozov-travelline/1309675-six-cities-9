import {
  setCity,
  loadOffers,
  setItemOffer,
  loadNearOffers,
  loadFavorites,
  updateItemOffer,
  offersData
} from './offers-data';
import {makeFakeCity, makeFakeOffer, makeFakeOffersList} from '../../utils/mocks';
import {DEFAULT_CITY} from '../../const';
import {OffersData} from '../../types/state';
import {deleteItemOfferOnList} from '../../utils/common';

const initialState: OffersData = {
  city: DEFAULT_CITY,
  offers: [],
  itemOffer: undefined,
  nearOffers: [],
  favorites: [],
  isDataLoaded: false,
};

describe('Reducer: offers', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should set City', () => {
    const mockCity = makeFakeCity();
    expect(offersData.reducer(initialState, setCity(mockCity)))
      .toEqual({...initialState, city: mockCity});
  });

  it('should load Offers', () => {
    const mockOffers = makeFakeOffersList();
    expect(offersData.reducer(initialState, loadOffers(mockOffers)))
      .toEqual({...initialState, offers: mockOffers, isDataLoaded: true});
  });

  it('should set Item Offer', () => {
    const mockOffer = makeFakeOffer();
    expect(offersData.reducer(initialState, setItemOffer(mockOffer)))
      .toEqual({...initialState, itemOffer: mockOffer});
  });

  it('should load Near Offers', () => {
    const mockOffers = makeFakeOffersList();
    expect(offersData.reducer(initialState, loadNearOffers(mockOffers)))
      .toEqual({...initialState, nearOffers: mockOffers});
  });

  it('should load Favorites', () => {
    const mockOffers = makeFakeOffersList();
    expect(offersData.reducer(initialState, loadFavorites(mockOffers)))
      .toEqual({...initialState, favorites: mockOffers});
  });

  it('should update item Offer', () => {
    const mockOffers = makeFakeOffersList();
    const UPDATED_OFFER_ID = 0;
    const mockItemOffer = mockOffers[UPDATED_OFFER_ID];
    mockItemOffer.isFavorite = true;
    mockOffers[UPDATED_OFFER_ID] = mockItemOffer;
    const state = {
      city: DEFAULT_CITY,
      offers: mockOffers,
      itemOffer: mockItemOffer,
      nearOffers: mockOffers,
      favorites: mockOffers,
      isDataLoaded: false,
    };
    mockItemOffer.isFavorite = false;
    mockOffers[UPDATED_OFFER_ID] = mockItemOffer;

    expect(offersData.reducer(state, updateItemOffer(mockItemOffer)))
      .toEqual({
        ...initialState,
        offers: mockOffers,
        itemOffer: mockItemOffer,
        nearOffers: mockOffers,
        favorites: deleteItemOfferOnList(mockItemOffer, mockOffers),
      });
  });
});
