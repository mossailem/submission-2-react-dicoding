import { PropTypes } from "prop-types";

function ContentCardActionButton({
  id,
  title,
  icon,
  additionalClass,
  handler,
}) {
  return (
    <button title={title} className={additionalClass} onClick={() => handler(id)}>
      <i className={`fa-solid ${icon} fa-fw`}></i>
    </button>
  );
}

ContentCardActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
  handler: PropTypes.func.isRequired,
};

export default ContentCardActionButton;
