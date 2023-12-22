import { PropTypes } from "prop-types";
import "../styles/Alert.css";

function Alert({ message }) {
  return <div className="alert-error">{message}</div>;
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
