import "../styles/ToolbarTitle.css";
import { PropTypes } from "prop-types";
import BackButton from "./BackButton";

function ToolbarTitle({ isHome, title }) {
  return (
    <div className="toolbar__title">
      {!isHome && <BackButton />}
      <h1>{title}</h1>
    </div>
  );
}

ToolbarTitle.propTypes = {
  isHome: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default ToolbarTitle;
