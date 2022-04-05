import {Comment} from '../../types/offer';
import {getFormattedDate, getStyleWidthByRating} from '../../utils/common';

type ReviewProperties = {
  comment: Comment,
}

function Review(reviewProperties: ReviewProperties): JSX.Element {
  const {comment} = reviewProperties;
  const {user} = comment;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={getStyleWidthByRating(comment.rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}
        </p>
        <time className="reviews__time" dateTime={getFormattedDate(comment.date, 'YYYY-MM-DD')}>{getFormattedDate(comment.date, 'MMMM YYYY')}</time>
      </div>
    </li>
  );
}

export default Review;
