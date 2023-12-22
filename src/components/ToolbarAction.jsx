import { PropTypes } from "prop-types";

import "../styles/ToolbarAction.css";

function ToolbarAction({ children }) {
  return <div className="toolbar__action">{children}</div>;
}

ToolbarAction.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default ToolbarAction;
