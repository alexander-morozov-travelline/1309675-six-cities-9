import {useAppDispatch} from '../../hooks/hooks';
import {MouseEvent} from 'react';
import {logoutAction} from '../../store/api-actions';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

function SignOut():JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOut = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={AppRoute.Root} onClick={handleSignOut} data-testid="signout-link">
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}

export default SignOut;
