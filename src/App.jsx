import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import For404 from "./pages/For404";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import Create from "./pages/Add";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/note/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/archives" element={<Archives />} />
      <Route path="*" element={<For404 />} />
    </Routes>
  );
}

export default App;
