import ToolbarAction from "./ToolbarAction";
import ToolbarTitle from "./ToolbarTitle";
import { PropTypes } from "prop-types";
import "../styles/Toolbar.css";

function Toolbar({ isHome, title, children }) {
  return (
    <header className="toolbar">
      <ToolbarTitle isHome={isHome} title={title} />

      <ToolbarAction>{children}</ToolbarAction>
    </header>
  );
}

Toolbar.propTypes = {
  isHome: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default Toolbar;
