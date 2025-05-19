import '../../../blocks/header.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import menuIcon from '../../../images/menu.svg';
import closeIcon from '../../../images/small-close-icon.png';

import { UserEmailContext } from '../../../contexts/UserEmailContext';
import { IsMenuOpenContext } from '../../../contexts/IsMenuOpenContext';
import { IsLoggedInContext } from '../../../contexts/IsLoggedInContext';

export default function UserInfo() {
  const { userEmail } = useContext(UserEmailContext);
  const {isMenuOpen, setIsMenuOpen} = useContext(IsMenuOpenContext);
  const { setIsLoggedIn } = useContext(IsLoggedInContext);

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("UserIdentifier");
    localStorage.setItem("CurrentUser", "{}");
    setIsLoggedIn(false);
    navigate("/signin");
  }
 
  return (
    <>
      <div className="header__user-info">
        <p className='header__user-email'>{userEmail}</p>
        <a onClick={logout} className='header__logout'>Sair</a>
      </div>

      {isMenuOpen? (
        <img onClick={()=> setIsMenuOpen(!isMenuOpen)} className='header__menu' src={closeIcon} alt="Ícone para fechar o menu." />
        ) : (
        <img onClick={()=> setIsMenuOpen(!isMenuOpen)} className='header__menu' src={menuIcon} alt="Ícone do menu." />
        )
      }
    </>
  )
}