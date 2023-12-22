import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import parse from "html-react-parser";
import formatIndonesianTimestamp from "../utils/TimestampFormatter";

function ContentCardContent({ id, title, timestamp, description, locale }) {
  return (
    <div className="card-content">
      <Link
        to={`/note/${id}`}
        className="card-content__title"
        title={
          locale === "en" ? "Click for details" : "Klik untuk melihat detail"
        }
      >
        {title}
      </Link>
      <small className="card-content__timestamp">
        {formatIndonesianTimestamp(timestamp, locale)}
      </small>
      <div className="card-content__description">{parse(description)}</div>
    </div>
  );
}

ContentCardContent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default ContentCardContent;
