import "../styles/For404.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function For404() {
  return (
    <>
      <div className="page-not-found">
        <i className="fa-solid fa-face-tired fa-4x"></i>
        <p>The page that you requested was not found!</p>
        <Link to="/">Back to Homepage</Link>
      </div>

      <Footer />
    </>
  );
}

export default For404;
