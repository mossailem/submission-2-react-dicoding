import { PropTypes } from "prop-types";
import "../styles/Alert.css";

function Alert({ message, isDisplayed }) {
  const displayClass = isDisplayed ? "alert-show" : "alert-hide";
  return <div className={`alert-error ${displayClass}`}>{message}</div>;
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
};

export default Alert;
