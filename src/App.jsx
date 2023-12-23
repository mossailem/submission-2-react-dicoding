import { Route, Routes, useNavigate } from "react-router-dom";
import "./styles/App.css";
import For404 from "./pages/For404";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import Create from "./pages/Add";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useMemo, useState } from "react";
import {
  getAccessToken,
  getUserLogged,
  putAccessToken,
} from "./utils/network-data";
import SessionContext from "./context/SessionContext";
import ColorModeContext from "./context/ColorModeContext";
import LocaleContext from "./context/LocaleContext";
import Loading from "./components/Loading";

function App() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "en");
  const [colorMode, setColorMode] = useState(
    localStorage.getItem("color-mode") || "light"
  );
  const [session, setSession] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();
  const onLoginSuccessHandler = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setSession(data);
    navigate("/");
  };
  const sessionContextValue = useMemo(() => {
    return { session, setSession };
  }, [session]);
  const toggleColorMode = () => {
    setColorMode((prevColorMode) => {
      const newColorMode = prevColorMode === "light" ? "dark" : "light";
      localStorage.setItem("color-mode", newColorMode);
      return newColorMode;
    });
  };
  const colorModeContextValue = useMemo(() => {
    return { colorMode, toggleColorMode };
  }, [colorMode]);
  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "en" ? "id" : "en";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };
  const localeContextValue = useMemo(() => {
    return { locale, toggleLocale };
  }, [locale]);

  useEffect(() => {
    if (!getAccessToken()) return setIsInitializing(false);
    
    getUserLogged().then(({ data }) => {
      setSession(data);
      setIsInitializing(false);
    });
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorMode);
  }, [colorMode]);

  if (isInitializing) {
    return (
      <SessionContext.Provider value={sessionContextValue}>
        <ColorModeContext.Provider value={colorModeContextValue}>
          <LocaleContext.Provider value={localeContextValue}>
            <Loading />
          </LocaleContext.Provider>
        </ColorModeContext.Provider>
      </SessionContext.Provider>
    );
  }

  if (!session) {
    return (
      <SessionContext.Provider value={sessionContextValue}>
        <ColorModeContext.Provider value={colorModeContextValue}>
          <LocaleContext.Provider value={localeContextValue}>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                element={<Login successHandler={onLoginSuccessHandler} />}
              />
            </Routes>
          </LocaleContext.Provider>
        </ColorModeContext.Provider>
      </SessionContext.Provider>
    );
  }

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <ColorModeContext.Provider value={colorModeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note/:id" element={<Detail />} />
            <Route path="/create" element={<Create />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="*" element={<For404 />} />
          </Routes>
        </LocaleContext.Provider>
      </ColorModeContext.Provider>
    </SessionContext.Provider>
  );
}

export default App;
