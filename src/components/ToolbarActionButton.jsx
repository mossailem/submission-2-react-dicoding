import { PropTypes } from "prop-types";

function ToolbarActionButton({ title, icon, additionalClass, handler, id }) {
  return (
    <button title={title} className={additionalClass} onClick={() => handler(id)}>
      <i className={`fa-solid ${icon} fa-fw`}></i> {title}
    </button>
  );
}

ToolbarActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
  handler: PropTypes.func,
};

export default ToolbarActionButton;
