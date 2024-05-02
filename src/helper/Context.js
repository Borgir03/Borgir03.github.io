import React, { createContext, useState } from "react";

const DataContext = createContext();

const Context = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [loginStatus, setLoginStatus] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });
  const [adminList, setAdminList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  return (
    <DataContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        loggedUser,
        setLoggedUser,
        loginStatus,
        setLoginStatus,
        adminList,
        setAdminList,
        selected,
        setSelected,
        recordList,
        setRecordList,
        auth,
        setAuth,
        token,
        setToken,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, Context };
