import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_CITY} from '../../const';
import {OffersData} from '../../types/state';

const initialState: OffersData = {
  city: DEFAULT_CITY,
  offers: [],
  itemOffer: undefined,
  nearOffers: [],
  isDataLoaded: false,
};

export const offersData = createSlice({
  name: NameSpace.offers,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    loadOffers: (state, actions) => {
      state.offers = actions.payload;
      state.isDataLoaded = true;
    },
    setItemOffer: (state, actions) => {
      state.itemOffer = actions.payload;
    },
    loadNearOffers: (state, actions) => {
      state.nearOffers = actions.payload;
    },
  },
});

export const {setCity, loadOffers, setItemOffer, loadNearOffers} = offersData.actions;

