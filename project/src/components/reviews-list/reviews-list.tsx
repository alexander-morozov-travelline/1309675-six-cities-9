import Review from '../revew/review';
import {Comment} from '../../types/offer';
import React from 'react';

type ReviewsListProperties = {
  comments: Comment[],
}
function ReviewsList(reviewsListProperties: ReviewsListProperties): JSX.Element {
  const { comments } = reviewsListProperties;
  return (
    <ul className="reviews__list" data-testid="reviews-list">
      {comments.map((comment) => (
        <Review key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default ReviewsList;
