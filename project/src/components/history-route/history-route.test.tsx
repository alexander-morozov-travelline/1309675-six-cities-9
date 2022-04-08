import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AppRoute} from '../../const';
import {act} from '@testing-library/react-hooks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HistoryRouter', () => {
  it('should render component for public route, when user not authorized', () => {
    const store = mockStore();

    history.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<h1>Favorites Route</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>Login Route</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Favorites Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login Route/i)).not.toBeInTheDocument();

    act(() => {
      history.push(AppRoute.Login);
    });

    expect(screen.getByText(/Login Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Favorites Route/i)).not.toBeInTheDocument();

  });

});
