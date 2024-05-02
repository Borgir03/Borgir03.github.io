import { Route, Navigate, Routes } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../helper/Context";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import List from "../components/List";
import AddStaff from "../components/AddStaff";
import Record from "../components/Record";
import AddRecord from "../components/AddRecord";
import Info from "../components/Info";

const PrivateRoute = () => {
  const { loginStatus } = useContext(DataContext);

  return (
    <>
      {!loginStatus && <Navigate to="/" replace />}
      <Routes>
        <Route
          path="/start"
          element={!loginStatus ? <Navigate to="/" /> : <Layout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="list" element={<List />} />
          <Route path="addStaff" element={<AddStaff />} />
          <Route path="records" element={<Record />} />
          <Route path="addRecords" element={<AddRecord />} />
          <Route path="patientinformation" element={<Info />} />
          <Route
            path="*"
            element={<Navigate to="/dashboard/start" replace />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default PrivateRoute;
