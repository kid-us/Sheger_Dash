import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Setting from "./components/Pages/Setting";
import Uploads from "./components/Pages/Uploads";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/upload" element={<Uploads />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
