import { useContext } from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { PopupContext } from "../../../contexts/PopupContext";

import { getTokenFromLocalStorage } from "../../../utils/getToken";

export default function EditProfile() {
  const { currentUser, handleUserUpdate } = useContext(CurrentUserContext); 
  const { setPopup } = useContext(PopupContext);
  const token = getTokenFromLocalStorage();

  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange", 
    defaultValues: {
      name: currentUser.name,
      description: currentUser.about
    }
  });

  function onSubmit(data) {
    const { name, description } = data;
    handleUserUpdate({ name, about: description }, token); 
    setPopup(null);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}                      name='edit-profile-popup'
      className="popup__form"
      noValidate>
      <div className="popup__inputs">
        <input
          name="name"
          { ...register('name', {
            required: "Esse campo é obrigatório.", 
            minLength: {
              value: 2,
              message: "O nome precisa ter no mínimo 2 caracteres."
            }, 
            maxLength: {
              value: 30,
              message: "O nome precisa ter no máximo 30 caracteres."
            }
          })}
          className="popup__input edit-profile-popup__input_name"
          type="text"
          placeholder="Nome"
        />
        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='popup__input-error popup__input-error_top'>{message}</p>} />
        
        <input
          name="description"
          { ...register('description', {
            required: "Esse campo é obrigatório.", 
            minLength: {
              value: 2,
              message: "A descrição precisa ter no mínimo 2 caracteres."
            }, 
            maxLength: {
              value: 30,
              message: "A descrição precisa ter no máximo 30 caracteres."
            }
          })}
          className="popup__input edit-profile-popup__input_about"
          type="text"
          placeholder="Sobre mim"
        />
        <ErrorMessage errors={errors} name="description" render={({ message }) => <p className='popup__input-error popup__input-error_bottom'>{message}</p>} />

        <button
          className="popup__submit-button edit-profile-popup__submit-button"
          type="submit"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}