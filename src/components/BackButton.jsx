import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Link to="/" className="back-button">
      <i className="fa-solid fa-arrow-left fa-fw"></i>
    </Link>
  );
}

export default BackButton;
