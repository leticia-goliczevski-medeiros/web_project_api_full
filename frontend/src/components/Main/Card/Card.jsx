import '../../../blocks/gallery.css';
import { useContext } from 'react';

import deleteIcon from '../../../images/delete-icon.png';
import heartIcon from '../../../images/heart-icon.png';
import heartIconAcive from '../../../images/heart-icon-active.png';

import ImagePopup from '../Popup/ImagePopup';

import { PopupContext } from '../../../contexts/PopupContext';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

import { getTokenFromLocalStorage } from '../../../utils/getToken';

export default function Card(props) {
  const { setPopup } = useContext(PopupContext);
  const { currentUser } = useContext(CurrentUserContext);
  const {card} = props;
  const { name, link } = props.card;
  
  const token = getTokenFromLocalStorage();

  const imageComponent = { children: 
    <ImagePopup card={props.card}/>}

  function handleLikeClick(card, token) {
    props.onCardLike(card, token)
  }

  function handleDeleteClick(card, token) {
    props.onCardDelete(card, token)
  }

  return (
    <li className="gallery__card" >
      <img className="gallery__card-image" src={link} 
        onClick={()=> setPopup(imageComponent)} alt={name} />

      {card.owner._id === currentUser._id && 
      <img
        onClick={()=> handleDeleteClick(card, token)}
        className="gallery__delete-icon"
        src={deleteIcon}
        alt="Ícone de excluir."
      />}

      <div className="gallery__card-info">
        <h2 className="gallery__card-title">{name}</h2>
        
        <div className="gallery__like-info">
          <img
            onClick={()=> handleLikeClick(card, token)}
            className="gallery__heart-icon"
            src={card.likes.some(user => user._id === currentUser._id)? heartIconAcive : heartIcon}
            alt="Ícone de coração."
          /> 
        </div>
      </div>
    </li>
  )
}