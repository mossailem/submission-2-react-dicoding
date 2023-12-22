import { PropTypes } from "prop-types";

function ContentCardAction({ children }) {
  return <div className="card-action">{children}</div>;
}

ContentCardAction.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default ContentCardAction;
