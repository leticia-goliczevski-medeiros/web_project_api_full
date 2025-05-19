import '../../blocks/pre-header.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserEmailContext } from '../../contexts/UserEmailContext.js';
import { IsMenuOpenContext } from '../../contexts/IsMenuOpenContext.js';
import { IsLoggedInContext } from '../../contexts/IsLoggedInContext.js';

export default function PreHeader() {
  const { userEmail } = useContext(UserEmailContext);
  const { isMenuOpen } = useContext(IsMenuOpenContext);
  const { setIsLoggedIn } = useContext(IsLoggedInContext);

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("UserIdentifier");
    localStorage.setItem("CurrentUser", "{}");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    isMenuOpen && 
      <div className="pre-header__user-info">
        <p className='pre-header__user-email'>{userEmail}</p>
        <a onClick={logout} className='pre-header__logout'>Sair</a>
      </div>
  )
}