import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddStaff() {
    const [first_name, setFirst] = useState('');
    const [middle_name, setMiddle] = useState('');
    const [last_name, setLast] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate()



    const handleAdd = (e)=> {
        e.preventDefault();
        if (!email || !password || !username || !first_name || !last_name) {
            console.error("No data");
            return;
          } else {
                axios.post('https://mybackend-1a9f650c8ab8.herokuapp.com/addStaff', {
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                    username: username,
                    password: password,
                    email: email,
                    contact: contactNumber,
                    gender: gender,
                    position: position
                    
                }).then(()=>{
                    console.log('Account has been Created')
                    alert('Account has been created.');
                    navigate("/dashboard/start/list")
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

        const isValidEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
          }

          const handleEmailChange = (event) => {
            const email = event.target.value;
            setEmail(email);
        
            if (!isValidEmail(email)) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          }
  return (
    <div className="flex flex-col gap-5 mb-4">
  <h2 className="text-2xl font-bold">Add Staff</h2>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">First Name:</label>
    <input
    required
      type="text"
      value={first_name}
      onChange={event => setFirst(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Middle Name:</label>
    <input
      type="text"
      value={middle_name}
      onChange={event => setMiddle(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Last Name:</label>
    <input required
      type="text"
      value={last_name}
      onChange={event => setLast(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Position:</label>
    <input required
      type="text"
      value={position}
      onChange={event => setPosition(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Email Address:</label>
    <input required
      type="email"
      value={email}
      onChange={handleEmailChange}
      className="w-full border p-2 rounded"
    />
    {email && emailError && (
              <p className="text-red-500 text-xs italic">Invalid email.</p>
            )}
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Username:</label>
    <input required
      type="text"
      value={username}
      onChange={event => setUsername(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Password:</label>
    <input required
      type="password"
      value={password}
      onChange={event => setPassword(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700"> Confirm Password:</label>
    <input required
      type="password"
      value={confirmPassword}
      onChange={event => setConfirmPassword(event.target.value)}
      className="w-full border p-2 rounded"
    />
    {confirmPassword && passwordError && (
              <p className="text-red-500 text-xs italic">Passwords do not match.</p>
            )}
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Contact Number:</label>
    <input required
      type="text"
      value={contactNumber}
      onChange={event => setContactNumber(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Gender:</label>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={event => setGender(event.target.value)}
          className="form-radio h-5 w-5 text-[#2F4858]"
        />
        <label htmlFor="male" className="text-sm text-gray-700">
          Male
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={event => setGender(event.target.value)}
          className="form-radio h-5 w-5 text-[#2F4858]"
        />
        <label htmlFor="female" className="text-sm text-gray-700">
          Female
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="radio"
          id="other"
          name="gender"
          value="other"
          checked={gender === 'other'}
          onChange={event => setGender(event.target.value)}
          className="form-radio h-5 w-5 text-[#2F4858]"
        />
        <label htmlFor="female" className="text-sm text-gray-700">
          Other
        </label>
      </div>
    </div>
  </div>
  <button
    className="bg-[#2F4858] hover:bg-[#1A3C4F] text-white font-bold py-2 px-4 rounded"
    onClick={handleAdd}
  >
    Register Staff
  </button>
</div>
  )
}

export default AddStaff