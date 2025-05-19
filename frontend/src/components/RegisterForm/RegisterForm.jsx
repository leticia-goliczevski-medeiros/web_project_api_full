import '../../blocks/auth-form.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import validator from "validator";

import Popup from '../Main/Popup/Popup.jsx';

import { PopupContext } from '../../contexts/PopupContext.js';

export default function RegisterForm({onUserRegister}) {
  const { popup } = useContext(PopupContext);
  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

  function onSubmit(data) {
    const {password, email} = data;
    onUserRegister({password, email});
  }

  return (
    <>
      <form 
          onSubmit={handleSubmit(onSubmit)}
          name='register-form'
          className="form"
          noValidate>
        <h2 className='form__title'>Inscrever-se</h2>
        <div className="form__inputs">
          <input
            name="email"
            { ...register('email', {
              required: "Esse campo é obrigatório.", 
              validate: {
                isEmail: (v)=> validator.isEmail(v) || "É necessário um email válido."
              }
            })}
            className="form__input register-form__input_email"
            type="email"
            placeholder="Email"
          />

          <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='form__input-error form__input-error_email'>{message}</p>} />

          <input
            name="password"
            { ...register('password', {
              required: "Esse campo é obrigatório.", 
              validate: {
                isStrongPassword: (v)=> validator.isStrongPassword(v, {
                  minLength: 8,
                  minLowercase: 1,
                  minUppercase: 1,
                  minNumbers: 1,
                  minSymbols: 1,
                }) || 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.'
              }
            })} 
            className="form__input register-form__input_password"
            type="password"
            placeholder="Senha"
          />

          <ErrorMessage errors={errors} name="password" render={({ message }) => <p className='form__input-error form__input-error_password'>{message}</p>} />
        </div>
        <button
          className="form__submit-button register-form__submit-button"
          type="submit"
        >
          Inscrever-se
        </button>
        <p className='form__text'>Já é um membro? <Link to="/signin" className='form__link' >Faça o login aqui!</Link> </p>
      </form> 

      {popup && (
        <Popup title={popup.title} >
          {popup.children}
        </Popup>
      )}
    </>      
  )
}