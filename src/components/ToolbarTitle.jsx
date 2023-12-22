import "../styles/ToolbarTitle.css";
import { PropTypes } from "prop-types";
import BackButton from "./BackButton";

function ToolbarTitle({ isHome, title, logoutHandler }) {
  return (
    <div className="toolbar__title">
      {!isHome && <BackButton />}
      <h1>{title}</h1>

      {isHome && (
        <small>
          <br />
          Logged in as <strong>Muslim Aswaja</strong> -{" "}
          <a href="#" title="Logout" onClick={logoutHandler}>
            Logout
          </a>
        </small>
      )}
    </div>
  );
}

ToolbarTitle.propTypes = {
  isHome: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

export default ToolbarTitle;
