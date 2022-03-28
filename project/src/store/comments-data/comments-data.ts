import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentsData} from '../../types/state';

const initialState: CommentsData = {
  comments: [],
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    loadOfferComments: (state, actions) => {
      state.comments = actions.payload;
    },
  },
});

export const {loadOfferComments} = commentsData.actions;

