import {render, screen} from '@testing-library/react';
import Layout from './layout';

describe('Component: Layout', () => {
  it('should render correctly', () => {
    render(<Layout />);

    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });
});
