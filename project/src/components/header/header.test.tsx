import React from 'react';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeUser} from '../../utils/mocks';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import Header from './header';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render with User correctly', () => {
    const mockUser = makeFakeUser();
    const store = mockStore({
      [NameSpace.User]: {
        user: mockUser,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('user-name')).toHaveTextContent(String(mockUser.email));
  });
});
