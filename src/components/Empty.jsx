import { useContext } from "react";
import "../styles/Empty.css";
import LocaleContext from "../context/LocaleContext";

function Empty() {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="notes-empty">
      <p>
        {locale === "en" ? "Nothing here..." : "Tidak ada apa-apa di sini..."}
      </p>
    </div>
  );
}

export default Empty;
