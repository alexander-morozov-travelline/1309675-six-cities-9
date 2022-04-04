import {render, screen} from '@testing-library/react';
import BookmarkButton from './bookmark-button';
import {AppRoute, AuthorizationStatus, BookmarkType, DEFAULT_CITY, NameSpace} from '../../const';
import React from 'react';
import {makeFakeOffer, makeFakeUser} from '../../utils/mocks';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(`${AppRoute.Offer}/1`);

const store = mockStore({
  [NameSpace.User]: {
    user: makeFakeUser(),
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: BookmarkButton', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BookmarkButton offer={mockOffer} width={18} height={19} type={BookmarkType.Property}/>
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('button')).toHaveClass('property__bookmark-button');
  });
});
