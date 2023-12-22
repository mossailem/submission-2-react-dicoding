import Alert from "../components/Alert";
import Footer from "../components/Footer";
import FormInput from "../components/FormInput";
import useInput from "../utils/use-input";
import FormContainer from "../components/FormContainer";
import "../styles/FormContainer.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../utils/network-data";

function Register() {
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

  return (
    <>
      <FormContainer>
        <h1>Register</h1>

        <Alert message={alertMessage} isDisplayed={isAlertDisplayed} />

        <form action="post" className="form" onSubmit={onSubmitHandler}>
          <FormInput
            id="name"
            type="name"
            label="Name"
            placeholder="Enter your name..."
            value={name}
            onChange={onNameChangeHandler}
          />

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

          <FormInput
            id="confirm-password"
            type="password"
            label="Confirm Password"
            placeholder="Enter your password confirmation..."
            value={confirmPassword}
            onChange={onConfirmPasswordChangeHandler}
          />

          <button>Register</button>
        </form>

        <p>
          Have an account? Login <Link to="/login">here</Link>!
        </p>
      </FormContainer>

      <Footer />
    </>
  );
}

export default Register;
