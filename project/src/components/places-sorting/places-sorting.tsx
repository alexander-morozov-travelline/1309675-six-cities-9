import {SortList, Sort} from '../../const';
import {useState} from 'react';

type PlacesSortingProps = {
  onSetSortType: (sortType: Sort) => void,
  sortType: Sort,
}
function PlacesSorting(placesSortingProps: PlacesSortingProps):JSX.Element {
  const {onSetSortType, sortType} = placesSortingProps;
  const [isSortMenuOpened, setIsSortMenuOpened] = useState<boolean>(false);

  const onSortMenuClick = () => {
    setIsSortMenuOpened(!isSortMenuOpened);
  };

  const onSortTypeClick = (sort: Sort) => {
    onSetSortType(sort);
    setIsSortMenuOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" data-testid="places-sorting">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortMenuClick}>` {sortType.title}`
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortMenuOpened ? ' places__options--opened': ''}`}>
        {
          SortList.map((item) =>
            (
              <li key={item.type} data-testid={item.type} className="places__option" tabIndex={0} onClick={() => onSortTypeClick(item)}>{item.title}</li>
            ),
          )
        }
      </ul>
    </form>
  );
}

export default PlacesSorting;
