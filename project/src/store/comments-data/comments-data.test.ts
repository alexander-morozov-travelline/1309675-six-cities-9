import {loadOfferComments, commentsData} from './comments-data';
import {makeFakeCommentList} from '../../utils/mocks';

describe('Reducer: comment', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        comments: [],
      });
  });

  it('should load comments', () => {
    const mockComments = makeFakeCommentList();
    const state = {
      comments: [],
    };

    expect(commentsData.reducer(state, loadOfferComments(mockComments)))
      .toEqual({
        comments: mockComments,
      });
  });
});
