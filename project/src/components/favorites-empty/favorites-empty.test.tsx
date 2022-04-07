import {render, screen} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: MainEmpty', () => {

  it('should render correctly', () => {
    render(
      <FavoritesEmpty />,
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
