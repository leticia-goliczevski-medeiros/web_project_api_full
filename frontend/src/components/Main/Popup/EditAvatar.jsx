import { useContext } from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import validator from "validator";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { PopupContext } from "../../../contexts/PopupContext";

import { getTokenFromLocalStorage } from "../../../utils/getToken";

export default function EditAvatar() {
  const { handleAvatarUpdate } = useContext(CurrentUserContext); 
  const { setPopup } = useContext(PopupContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

  const token = getTokenFromLocalStorage();

  function onSubmit(data) {
    const { link } = data;
    handleAvatarUpdate(link, token);
    setPopup(null);
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} name='update-profile-picture-popup'
      className="popup__form"
      noValidate>
      <div className="popup__inputs">
        <input
          name="link"
          { ...register('link', {
            required: "Esse campo é obrigatório.",
            validate: {
              isURL: (v)=> validator.isURL(v) || "É necessário um link válido."
            } 
          })}
          className="popup__input update-profile-picture-popup__input_picture"
          type="url"
          placeholder="Link da foto"
        />
        <ErrorMessage errors={errors} name="link" render={({ message }) => <p className='popup__input-error popup__input-error_top'>{message}</p>} />
      </div>

      <button
        className="popup__submit-button update-profile-picture-popup__submit-button"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}