import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

function ToolbarActionLink({ title, icon, url, additionalClass }) {
  return (
    <Link to={url} title={title} className={additionalClass}>
      <i className={`fa-solid ${icon} fa-fw`}></i> {title}
    </Link>
  );
}

ToolbarActionLink.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
};

export default ToolbarActionLink;
