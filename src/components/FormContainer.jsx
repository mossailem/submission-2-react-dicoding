import { PropTypes } from "prop-types";
import "../styles/FormContainer.css";

function FormContainer({ children }) {
  return <div className="form-container">{children}</div>;
}

FormContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default FormContainer;
