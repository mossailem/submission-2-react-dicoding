import "../styles/For404.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import LocaleContext from "../context/LocaleContext";
import { useContext } from "react";

function For404() {
  const { locale } = useContext(LocaleContext);

  const description =
    locale === "en"
      ? "The page that you requested was not found!"
      : "Halaman yang Anda tuju tidak ditemukan!";
  const buttonText =
    locale === "en" ? "Back to Homepage" : "Kembali ke Halaman Awal";

  return (
    <>
      <div className="page-not-found">
        <i className="fa-solid fa-face-tired fa-4x"></i>
        <p>{description}</p>
        <Link to="/">{buttonText}</Link>
      </div>

      <Footer />
    </>
  );
}

export default For404;
