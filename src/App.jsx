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
import { getUserLogged, putAccessToken } from "./utils/network-data";
import SessionContext from "./context/SessionContext";
import ColorModeContext from "./context/ColorModeContext";
import LocaleContext from "./context/LocaleContext";

function App() {
  const [locale, setLocale] = useState("en");
  const [colorMode, setColorMode] = useState("light");
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
      return prevColorMode === "light" ? "dark" : "light";
    });
  };
  const colorModeContextValue = useMemo(() => {
    return { colorMode, toggleColorMode };
  }, [colorMode]);
  const toggleLocale = () => {
    setLocale((prevLocale) => {
      return prevLocale === "en" ? "id" : "en";
    });
  };
  const localeContextValue = useMemo(() => {
    return { locale, toggleLocale };
  }, [locale]);

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setSession(data);
    });
    setIsInitializing(false);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorMode);
  }, [colorMode]);

  if (isInitializing) {
    return null;
  }

  if (!session) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={<Login successHandler={onLoginSuccessHandler} />}
        />
      </Routes>
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
