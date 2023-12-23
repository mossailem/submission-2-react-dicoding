import "../styles/ToolbarTitle.css";
import { PropTypes } from "prop-types";
import BackButton from "./BackButton";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import { redirect } from "react-router-dom";
import ColorModeContext from "../context/ColorModeContext";
import LocaleContext from "../context/LocaleContext";
import { putAccessToken } from "../utils/network-data";

function ToolbarTitle({ isHome, title }) {
  const { session, setSession } = useContext(SessionContext);
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  const logoutHandler = () => {
    setSession(null);
    putAccessToken("");
    redirect("/");
  };

  const greet = locale === "en" ? "Hey" : "Hai";
  const changeLanguage = locale === "en" ? "Change Language" : "Ubah bahasa";
  const changeTo = locale === "en" ? "Change to" : "Ubah menjadi";
  const darkMode = locale === "en" ? "Dark Mode" : "Mode Gelap";
  const lightMode = locale === "en" ? "Light Mode" : "Mode Terang";

  return (
    <div className="toolbar__title">
      {!isHome && <BackButton />}
      <h1>{title}</h1>

      {isHome && (
        <small>
          <br />
          {greet}, <strong>{session.name}</strong> -{" "}
          <a href="#" title="Logout" onClick={logoutHandler}>
            Logout
          </a>
          <a href="#" title={changeLanguage} onClick={toggleLocale}>
            {locale === "en" ? "ID" : "EN"}
          </a>
          <a
            href="#"
            title={`${changeTo} ${
              colorMode === "light" ? darkMode : lightMode
            }`}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? darkMode : lightMode}
          </a>
        </small>
      )}
    </div>
  );
}

ToolbarTitle.propTypes = {
  isHome: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default ToolbarTitle;
