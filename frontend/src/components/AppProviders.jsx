import { useState } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { IsLoggedInContext } from '../contexts/IsLoggedInContext.js';
import { PopupContext } from '../contexts/PopupContext.js';
import { UserEmailContext } from '../contexts/UserEmailContext.js';
import { IsMenuOpenContext } from '../contexts/IsMenuOpenContext.js';

import { api } from '../utils/api.js';

export default function AppProviders({children}) {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("CurrentUser"))
  });
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('UserIdentifier')
    return !!token
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleUserUpdate(user, token) {
    api.updateProfileInfo(user, token)
      .then((userObject)=> {
        setCurrentUser(userObject);
        localStorage.setItem("CurrentUser", JSON.stringify(userObject));
      })
      .catch((error) => console.log(error, token));
  };

  function handleAvatarUpdate(avatarLink, token) {
    api.updateProfilePicture(avatarLink, token)
      .then((userObject)=> {
        setCurrentUser(userObject);
        localStorage.setItem("CurrentUser", JSON.stringify(userObject));
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <PopupContext.Provider value={{popup, setPopup}}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, handleUserUpdate, handleAvatarUpdate }}>
        <UserEmailContext.Provider value={{userEmail, setUserEmail}}>
          <IsLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            <IsMenuOpenContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
              {children}
            </IsMenuOpenContext.Provider>
          </IsLoggedInContext.Provider>
        </UserEmailContext.Provider>
      </CurrentUserContext.Provider>
    </PopupContext.Provider>
  )
}