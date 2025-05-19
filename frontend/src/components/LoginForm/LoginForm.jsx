import '../../blocks/auth-form.css';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import validator from "validator";

export default function LoginForm({onLoginHandle}) {
  const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

  function onSubmit(data) {
    const {password, email} = data;
    onLoginHandle({password, email})
  };

  return (
    <form 
      name='login-form'
      onSubmit={handleSubmit(onSubmit)}
      className="form"
      noValidate>

      <h2 className='form__title'>Entrar</h2>
      
      <div className="form__inputs">
        <input
          name="email"
          { ...register('email', {
            required: "Esse campo é obrigatório.", 
            validate: {
              isEmail: (v)=> validator.isEmail(v) || "É necessário um email válido."
            }
          })}
          className="form__input login-form__input_email"
          type="email"
          placeholder="Email"
        />

        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='form__input-error form__input-error_email'>{message}</p>} />

        <input
          name="password"
          { ...register('password', {
            required: "Esse campo é obrigatório."
          })} 
          className="form__input login-form__input_password"
          type="password"
          placeholder="Senha"
        />

        <ErrorMessage errors={errors} name="password" render={({ message }) => <p className='form__input-error form__input-error_password'>{message}</p>} />
      </div>

      <button
        className="form__submit-button login-form__submit-button"
        type="submit"
      >
        Entrar
      </button>

      <p className='form__text'>Ainda não é membro? <Link to="/signup" className='form__link' >Inscreva-se aqui!</Link> </p>
    </form> 
  )
}