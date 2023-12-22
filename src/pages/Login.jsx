import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Footer from "../components/Footer";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import useInput from "../utils/use-input";
import { PropTypes } from "prop-types";
import { login } from "../utils/network-data";
import { useState } from "react";

function Login({ successHandler }) {
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    hideAlert();

    if (!email) return showAlert("Fill the email!");
    if (!password) return showAlert("Fill the password!");

    const { error, data } = await login({
      email: email,
      password: password,
    });

    if (error) {
      return showAlert("Login failed!");
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
            placeholder="Enter your email..."
            value={email}
            onChange={onEmailChangeHandler}
          />

          <FormInput
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password..."
            value={password}
            onChange={onPasswordChangeHandler}
          />

          <button>Login</button>
        </form>

        <p>
          Don&apos;t have an account? Register <Link to="/register">here</Link>!
        </p>
      </FormContainer>

      <Footer />
    </>
  );
}

Login.propTypes = { successHandler: PropTypes.func.isRequired };

export default Login;
