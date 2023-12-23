import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Footer from "../components/Footer";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import useInput from "../utils/use-input";
import { PropTypes } from "prop-types";
import { login } from "../utils/network-data";
import { useContext, useState } from "react";
import LocaleContext from "../context/LocaleContext";

function Login({ successHandler }) {
  const { locale } = useContext(LocaleContext);
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    hideAlert();

    if (!email)
      return showAlert(
        locale === "en" ? "Fill the email!" : "Email harus diisi!"
      );
    if (!password)
      return showAlert(
        locale === "en" ? "Fill the password!" : "Password harus diisi!"
      );

    const { error, data } = await login({
      email: email,
      password: password,
    });

    if (error) {
      return showAlert(locale === "en" ? "Login failed!" : "Login gagal!");
    }

    successHandler(data);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertDisplayed(true);
  };
  const hideAlert = () => {
    setAlertMessage("");
    setIsAlertDisplayed(false);
  };

  const footerText =
    locale === "en"
      ? "Don't have an account? Register"
      : "Belum memiliki akun? Daftar";

  return (
    <>
      <FormContainer>
        <h1>Login</h1>

        <Alert message={alertMessage} isDisplayed={isAlertDisplayed} />

        <form action="post" className="form" onSubmit={onSubmitHandler}>
          <FormInput
            id="email"
            type="email"
            label="Email"
            placeholder={
              locale === "en" ? "Enter your email..." : "Masukkan email Anda..."
            }
            value={email}
            onChange={onEmailChangeHandler}
          />

          <FormInput
            id="password"
            type="password"
            label="Password"
            placeholder={
              locale === "en"
                ? "Enter your password..."
                : "Masukkan password Anda..."
            }
            value={password}
            onChange={onPasswordChangeHandler}
          />

          <button>Login</button>
        </form>

        <p>
          {footerText}{" "}
          <Link to="/register">{locale === "en" ? "here" : "di sini"}</Link>!
        </p>
      </FormContainer>

      <Footer />
    </>
  );
}

Login.propTypes = { successHandler: PropTypes.func.isRequired };

export default Login;
