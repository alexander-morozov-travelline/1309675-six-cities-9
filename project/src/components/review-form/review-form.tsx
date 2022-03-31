import {useState, Fragment, FormEvent, ChangeEvent} from 'react';
import {MIN_COMMENT_LENGTH, RateList} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {CommentDataForm} from '../../types/offer';
import {sendCommentAction} from '../../store/api-actions';

function ReviewForm(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const initState: CommentDataForm = {rating: null, review: ''};
  const [formData, setFormData] = useState(initState);
  const [isDisabled, setDisabled] = useState(false);
  const {itemOffer: offer} = useAppSelector(({OFFERS}) => OFFERS);

  if(!offer) {
    return null;
  }

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    evt.preventDefault();
    await dispatch(sendCommentAction({commentDataForm: formData, hotelId: offer.id}));
    setFormData(initState);
    setDisabled(false);
  };

  const handleDataChange = (evt: ChangeEvent<HTMLElement>) => {
    const { name, value } = evt.target as HTMLFormElement;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RateList.map(({id, value, title}) =>
            (
              <Fragment key={id}>
                <input className="form__rating-input visually-hidden"
                  name="rating"
                  value={value}
                  id={id}
                  type="radio"
                  checked={Number(formData.rating) === value}
                  onChange={handleDataChange}
                />
                <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>
              </Fragment>
            ),
          )
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleDataChange}
        disabled={isDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={isDisabled || !(formData.rating && formData.review && formData.review.length>MIN_COMMENT_LENGTH)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
