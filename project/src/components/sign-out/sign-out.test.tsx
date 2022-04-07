import {render, screen} from '@testing-library/react';
import * as Redux from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, NameSpace} from '../../const';
import SignOut from './sign-out';
import userEvent from '@testing-library/user-event';
import {makeFakeUser} from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    user: makeFakeUser(),
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: SignOut', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignOut />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
  it('should signout click', () => {
    const dispatch = jest.fn();

    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignOut />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('signout-link'));
    expect(useDispatch).toBeCalledTimes(1);

  });
});
