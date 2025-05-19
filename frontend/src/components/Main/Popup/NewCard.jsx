import { useContext } from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import validator from "validator";

import { PopupContext } from "../../../contexts/PopupContext";

export default function NewCard({onAddPlaceSubmit}) {
  const { setPopup } = useContext(PopupContext);

  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

  function handleAddPlaceSubmit(data){
    const {name, link} = data;
    onAddPlaceSubmit(name, link);
    setPopup(null);
  }

  return (
    <form 
      onSubmit={handleSubmit(handleAddPlaceSubmit)} name='add-card-popup'
      className="popup__form"
      noValidate>
      <div className="popup__inputs">
        <input
          name="name"
          { ...register('name', {
            required: "Esse campo é obrigatório.", 
            minLength: {
              value: 2,
              message: "O título precisa ter no mínimo 2 caracteres."
            }, 
            maxLength: {
              value: 30,
              message: "O título precisa ter no máximo 30 caracteres."
            }
          })}
          className="popup__input add-card-popup__input_title"
          type="text"
          placeholder="Título"
        />
        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='popup__input-error popup__input-error_top'>{message}</p>} />
        
        <input
          name="link"
          { ...register('link', {
            required: "Esse campo é obrigatório.", 
            validate: {
              isURL: (v)=> validator.isURL(v) || "É necessário um link válido."
            }
          })}
          className="popup__input add-card-popup__input_link"
          type="url"
          placeholder="Link de imagem"
        />
        <ErrorMessage errors={errors} name="link" render={({ message }) => <p className='popup__input-error popup__input-error_bottom'>{message}</p>} />
      </div>
      <button
        className="popup__submit-button add-card-popup__submit-button"
        type="submit"
      >
        Criar
      </button>
    </form>
  )
}