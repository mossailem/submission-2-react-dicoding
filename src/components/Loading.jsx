import { useContext } from "react";
import "../styles/Empty.css";
import LocaleContext from "../context/LocaleContext";

function Loading() {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="notes-empty">
      <p>{locale === "en" ? "Loading..." : "Sedang memuat..."}</p>
    </div>
  );
}

export default Loading;
