import Header from "../components/Header/Header";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Login({onLoginHandle}) {
  return (
    <>
      <Header />
      <LoginForm onLoginHandle={onLoginHandle} />
    </>
  )
}