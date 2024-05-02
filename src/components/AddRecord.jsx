import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddRecord() {
  const [first_name, setFirst] = useState('');
  const [middle_name, setMiddle] = useState('');
  const [last_name, setLast] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [age, setAge] = useState(0);
  const [religion, setReligion] = useState('');
  const [gender, setGender] = useState('');
  const [civil, setCivil] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [checked_by, setCheck] = useState('');
  
    const navigate = useNavigate()
  
    const handleAdd = (e)=> {
        e.preventDefault();
        if (!first_name || !last_name) {
            console.error("No data");
            return;
          } else {
                axios.post('http://localhost:3003/addRecord', {
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                    birthday: birthday,
                    age: age,
                    checked_by: checked_by,
                    gender: gender,
                    civil: civil,
                    contact: contact,
                    address: address,
                    religion: religion
                }).then(()=>{
                    console.log('Account has been Created')
                    alert('Account has been created.');
                    navigate("/dashboard/start/records")
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


  return (
    <div className="flex flex-col gap-5 mb-4">
  <h2 className="text-2xl font-bold">Record Patient</h2>
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
    <label className="text-sm font-medium text-gray-700">Birthday:</label>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={dayjs(birthday)}
              onChange={(newDate) => setBirthday(newDate.toDate())} />
    </LocalizationProvider>
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Age:</label>
    <input required
      type="number"
      value={age}
      onChange={event => setAge(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Contact:</label>
    <input required
      type="text"
      value={contact}
      onChange={event => setContact(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Address:</label>
    <input required
      type="text"
      value={address}
      onChange={event => setAddress(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Religion:</label>
    <input required
      type="text"
      value={religion}
      onChange={event => setReligion(event.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Civil Status:</label>
    <input required
      type="text"
      value={civil}
      onChange={event => setCivil(event.target.value)}
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
          value="Male"
          checked={gender === 'Male'}
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
          value="Female"
          checked={gender === 'Female'}
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
          value="Other"
          checked={gender === 'Other'}
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
    Add Patient
  </button>
</div>
  )
}

export default AddRecord