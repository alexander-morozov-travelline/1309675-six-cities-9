import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, DEFAULT_CITY, NameSpace} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeUser} from '../../utils/mocks';
import React from 'react';
import Login from './login';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Login', () => {
  const store = mockStore({
    [NameSpace.Offers]: {
      city: DEFAULT_CITY,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: makeFakeUser(),
    },
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_CITY.name)).toBeInTheDocument();
  });
});
