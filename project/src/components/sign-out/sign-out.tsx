import {FormEvent} from 'react';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/hooks';

function SignOut():JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignOut = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(logoutAction);
  };
  return (
    <li className="header__nav-item">
      <a className="header__nav-link" href="#">
        <span className="header__signout" onClick={() => handleSignOut}>Sign out</span>
      </a>
    </li>
  );
}

export default SignOut;
