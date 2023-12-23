import Alert from "../components/Alert";
import Footer from "../components/Footer";
import FormInput from "../components/FormInput";
import useInput from "../utils/use-input";
import FormContainer from "../components/FormContainer";
import "../styles/FormContainer.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { register } from "../utils/network-data";
import LocaleContext from "../context/LocaleContext";

function Register() {
  const { locale } = useContext(LocaleContext);
  const [name, onNameChangeHandler] = useInput("");
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput("");
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    hideAlert();

    if (!name) return showAlert("Fill the name!");
    if (!email) return showAlert("Fill the email!");
    if (!password) return showAlert("Fill the password!");
    if (!confirmPassword) return showAlert("Fill the confirm password!");
    if (!isPasswordAndConfirmMatch()) {
      return showAlert("Password and confirmation not match");
    }

    const { error } = await register({
      name: name,
      email: email,
      password: password,
    });

    if (error) {
      return showAlert("Registration failed!");
    }

    navigate("/");
  };
  const isPasswordAndConfirmMatch = () => password === confirmPassword;
  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertDisplayed(true);
  };
  const hideAlert = () => {
    setAlertMessage("");
    setIsAlertDisplayed(false);
  };

  const footerText =
    locale === "en" ? "Have an account? Login" : "Sudah memiliki akun? Login";

  return (
    <>
      <FormContainer>
        <h1>{locale === "en" ? "Register" : "Daftar"}</h1>

        <Alert message={alertMessage} isDisplayed={isAlertDisplayed} />

        <form action="post" className="form" onSubmit={onSubmitHandler}>
          <FormInput
            id="name"
            type="name"
            label={locale === "en" ? "Name" : "Nama"}
            placeholder={
              locale === "en" ? "Enter your name..." : "Masukkan nama Anda..."
            }
            value={name}
            onChange={onNameChangeHandler}
          />

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

          <FormInput
            id="confirm-password"
            type="password"
            label={locale === "en" ? "Confirm Password" : "Konfirmasi Password"}
            placeholder={
              locale === "en"
                ? "Enter your password confirmation..."
                : "Masukkan konfirmasi password Anda..."
            }
            value={confirmPassword}
            onChange={onConfirmPasswordChangeHandler}
          />

          <button>{locale === "en" ? "Register" : "Daftar"}</button>
        </form>

        <p>
          {footerText}{" "}
          <Link to="/login">{locale === "en" ? "here" : "di sini"}</Link>!
        </p>
      </FormContainer>

      <Footer />
    </>
  );
}

export default Register;
