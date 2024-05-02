import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../helper/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const { username, setUsername, password, setPassword, setLoggedUser, loggedUser,setAuth, loginStatus, setLoginStatus } = useContext(DataContext)
const [errorMessage, setErrorMessage] = useState("");

const navigate = useNavigate()


axios.defaults.withCredentials = true

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
        console.error("No data.");
        return;
      }
    axios.post("http://localhost:3003/login", {
        username: username,
        password: password
    }).then((response) => {
        if (!response.data.auth) {
            setLoginStatus(false)
            setAuth(response.data.auth)
            setErrorMessage(response.data.message);

        } else {
            console.log(response.data)
            localStorage.setItem("token", response.data.token)

            const user = response.data.results
            localStorage.setItem("loggedUser", JSON.stringify(user));
            setLoginStatus(true)
            setErrorMessage(null)
            setAuth(response.data.auth)
            userAuth()
            console.log(response.data.results)
            setLoggedUser(user)
            navigate("/dashboard/start")
        }
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      window.location.reload();
      console.log(error)
  });
  };

  useEffect(() => {
    axios.get("http://localhost:3003/login").then((response) => {
        if (response.data.loggedIn === true) {
            setLoggedUser(response.data.user)
            console.log(loggedUser)
        }
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      window.location.reload();
      console.log(error)
  });
  }, [])

  const userAuth = () => {
    axios.get("http://localhost:3003/isAuth", {headers: {
        "x-access-token": localStorage.getItem("token")
    }}).then((response) => {
        console.log(response)
    })
  }


  return (
    <div className="flex items-center justify-center h-screen flex-col">
        <h2 className="text-3xl text-center text-gray-800 font-bold mb-6">Welcome back!</h2>
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errorMessage && (
              <p className="text-center text-red-500 text-xs">{errorMessage}</p>
            )}
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
              Username:
            </label>
            <input
              required
              type="text"
              id="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter username'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password:
            </label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#413C58] w-[60%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-[#413C58] hover:text-blue-800" href="/#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          Don't have an account? <a className="no-underline hover:underline text-[#413C58]" href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;