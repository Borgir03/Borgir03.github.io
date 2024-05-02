import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "./helper/Context";
import Login from "./screen/Login";
import Register from "./screen/Register";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <Context>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Context>
  );
}

export default App;
