import {render, screen} from '@testing-library/react';
import {makeFakeCommentList} from '../../utils/mocks';
import React from 'react';
import ReviewsList from './reviews-list';

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    const mockCommentList = makeFakeCommentList();

    render(<ReviewsList comments={mockCommentList}/>);

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('review-item').length).toBe(mockCommentList.length);
  });
});
