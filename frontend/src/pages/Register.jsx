import Header from "../components/Header/Header";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export default function Register({onUserRegister}) {
  return (
    <>
      <Header />
      <RegisterForm onUserRegister={onUserRegister}/>
    </>
  )
}