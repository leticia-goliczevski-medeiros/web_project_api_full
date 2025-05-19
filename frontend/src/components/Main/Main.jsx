import '../../blocks/profile.css';
import {  useContext } from 'react';

import editProfilePictureIcon from '../../images/edit-profile-picture-icon.png';
import editProfileIcon from '../../images/edit-button.png';
import addCardIcon from '../../images/plus-sign.png';

import Card from './Card/Card.jsx';
import Popup from './Popup/Popup.jsx';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { PopupContext } from '../../contexts/PopupContext.js';

export default function Main({newCardPopup, editAvatarPopup, editProfilePopup, cards, onCardLike, onCardDelete}) {
  
  const { currentUser } = useContext(CurrentUserContext);
  const { popup, setPopup } = useContext(PopupContext);

  return (
    <main className='content'>
      <section className="profile">
        <div className="profile__picture-container" onClick={() => setPopup(editAvatarPopup)}>
          <img
            className="profile__picture"
            src={currentUser.avatar}
            alt="Foto de perfil do usuário."
          />
          <img
            className="profile__picture-overlay-edit-icon"
            src={editProfilePictureIcon}
            alt="Ícone de editar foto de perfil."
          />
        </div>
        <div className="profile__information">
          <div className="profile__name-and-icon">
            <h1 className="profile__name">{currentUser.name}</h1>
            <img
              className="profile__edit-icon"
              src={editProfileIcon}
              alt="Ícone de editar informações do perfil."
              onClick={() => setPopup(editProfilePopup)}
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={() => setPopup(newCardPopup)}>
          <img
            className="profile__add-button-plus-sign"
            src={addCardIcon}
            alt="Ícone de adicionar postagem."
          />
        </button>
      </section>
      
      <section className="gallery">
        <ul className="gallery__cards">
          {cards.slice().reverse().map(card=> (
            <Card card={card} key={card._id} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>

      {popup && (
        <Popup title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  )
}