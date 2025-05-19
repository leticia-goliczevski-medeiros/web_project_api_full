import '../../blocks/header.css';
import { useContext } from 'react';

import logo from '../../images/around.png';

import UserInfo from './UserInfo/UserInfo';
import Instruction from './Instruction/Instruction';

import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';

export default function Header() {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  
  return (
    <header className='header'>
      <img
        className="header__logo"
        src={logo}
        alt="Logo escrito 'Around the U.S.'"
      />

      { isLoggedIn? < UserInfo /> : < Instruction /> }
    </header>
  )
}