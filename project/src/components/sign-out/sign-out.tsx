import {useAppDispatch} from '../../hooks/hooks';
import {MouseEvent} from 'react';
import {logoutAction} from '../../store/api-actions';

function SignOut():JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOut = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <li className="header__nav-item">
      <a className="header__nav-link" href="#" onClick={handleSignOut} data-testid="signout-link">
        <span className="header__signout">Sign out</span>
      </a>
    </li>
  );
}

export default SignOut;
