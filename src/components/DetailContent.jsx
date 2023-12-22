import { PropTypes } from "prop-types";
import formatIndonesianTimestamp from "../utils/TimestampFormatter";
import parser from "html-react-parser";

function DetailContent({ title, timestamp, description }) {
  return (
    <main className="content">
      <h1 className="content__title">{title}</h1>
      <p className="content__timestamp">
        {formatIndonesianTimestamp(timestamp)}
      </p>
      <div className="content__description">{parser(description)}</div>
    </main>
  );
}

DetailContent.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DetailContent;
