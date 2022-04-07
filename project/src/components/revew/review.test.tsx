import {render, screen} from '@testing-library/react';
import {makeFakeComment} from '../../utils/mocks';
import Review from './review';

describe('Component: Review', () => {
  const mockComment = makeFakeComment();

  it('should render correctly', () => {
    render(
      <Review key={mockComment.id} comment={mockComment} />,
    );

    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
  });
});
