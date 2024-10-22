import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Setting from "./components/Pages/Setting";
import Uploads from "./components/Pages/Uploads";
import Orders from "./components/Pages/Orders";
import Stock from "./components/Pages/Stock";
import Protected from "./components/Protected/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/orders"
          element={
            <Protected>
              <Orders />
            </Protected>
          }
        />
        <Route
          path="/setting"
          element={
            <Protected>
              <Setting />
            </Protected>
          }
        />
        <Route
          path="/upload"
          element={
            <Protected>
              <Uploads />
            </Protected>
          }
        />
        <Route
          path="/stock"
          element={
            <Protected>
              <Stock />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
