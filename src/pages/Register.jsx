import Alert from "../components/Alert";
import Footer from "../components/Footer";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";

function Register() {
  return (
    <>
      <FormContainer>
        <h1>Register</h1>

        <Alert message="Check" />

        <form action="post" className="form">
          <FormInput
            id="name"
            type="name"
            label="Name"
            placeholder="Enter your name..."
          />

          <FormInput
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email..."
          />

          <FormInput
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password..."
          />

          <FormInput
            id="confirm-password"
            type="password"
            label="Confirm Password"
            placeholder="Enter your password confirmation..."
          />

          <button>Register</button>
        </form>

        <p>
          Have an account? Login <a href="#">here</a>!
        </p>
      </FormContainer>

      <Footer />
    </>
  );
}

export default Register;