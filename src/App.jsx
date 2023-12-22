import { Route, Routes, useNavigate } from "react-router-dom";
import "./styles/App.css";
import For404 from "./pages/For404";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import Create from "./pages/Add";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { getUserLogged, putAccessToken } from "./utils/network-data";

function App() {
  const [session, setSession] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();
  const onLoginSuccessHandler = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setSession(data);
    navigate("/");
  };

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setSession(data);
    });
    setIsInitializing(false);
  }, []);

  if (isInitializing) return null;

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/note/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/archives" element={<Archives />} />
      <Route path="*" element={<For404 />} />
    </Routes>
  );
}

export default App;
