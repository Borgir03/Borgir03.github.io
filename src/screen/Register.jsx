import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleRegister = (e)=> {
    e.preventDefault();
    if (!email || !password || !username) {
        console.error("No data");
        return;
      } else {
            axios.post('https://mybackend-1a9f650c8ab8.herokuapp.com/register', {
                email: email,
                username: username,
                password: password
            }).then(()=>{
                console.log('Account has been Created')
            }).catch((error) => {
                if (error.response) {
                  console.error(error.response.data);
                } else if (error.request) {
                  console.error(error.request);
                } else {
                  console.error(error.message);
                }
              });
        }
    }
    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordError(true);
          } else {
            setPasswordError(false)
          }
    }, [confirmPassword, password])
    

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-3xl text-center text-gray-800 font-bold mb-6">Create an account</h2>
        <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">Passwords do not match.</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#413C58] w-[50%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-[#413C58] hover:text-blue-800" href="/#">
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;