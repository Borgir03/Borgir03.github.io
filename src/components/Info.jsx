import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../helper/Context';
import axios from 'axios';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { Button,RadioGroup,FormControlLabel, Radio, Box, FormControl, Modal, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  height: 700,
  borderRadius: '25px',
  overflowY: "auto"
};


function Info() {
    const { recordList, setRecordList, selected, setSelected } = useContext(DataContext)
    const [searchTerm, setSearchTerm] = useState('')
  const [first, setFirst] = useState('');
  const [middle, setMiddle] = useState('');
  const [last, setLast] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [age, setAge] = useState(0);
  const [religion, setReligion] = useState('');
  const [gender, setGender] = useState('');
  const [civil, setCivil] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [open, setOpen] = useState(false);


  const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get("http://localhost:3003/patientInfo");
            setRecordList(result.data);
            console.log(result.data)
          } catch (error) {
            if (error.response) {
              window.location.reload();
            } else if (error.request) {
              console.error('No response received');
            } else {
              console.error('Error setting up the request');
            }
            console.error(error.message);
          }
        };
    
        fetchData();
    
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
      },);

      const updateRecord = (id, birthday) => {
        const formattedBirthday = new Date(birthday).toISOString().slice(0, 10);
        if (!first || !last || !birthday) {
          console.error("No data");
          return; } else {
        
        axios.put("http://localhost:3003/updateRecord", { 
          id: selected.id,
          first_name: first,
          middle_name: middle,
          last_name: last,
          birthday: formattedBirthday,
          age: age,
          gender: gender,
          contact: contact,
          address: address,
          religion: religion,
          civil: civil
        }).then(
          (response) => {
            setRecordList(
              recordList.map((val) => {
                return val.id === id
                  ? {
                      id: selected.id,
                      first_name: val.first_name,
                      middle_name: val.middle_name,
                      last_name: val.last_name,
                        birthday: val.birthday,
                        age: val.age,
                        gender: val.gender,
                        contact: val.contact,
                        address: val.address,
                        religion: val.religion,
                        civil: val.civil
                    }
                  : val;
              })
            );
            setOpen(false)
          }
        ).catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("An error occurred. Please try again.");
            console.log(errorMessage)
          }
          window.location.reload();
          console.log(error)
      });}
      };
    

      const filteredRecord = recordList.filter(record => {
        return record.id?.toString().includes(searchTerm) ||
               record.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               record.middle_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
               record.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
      })

      const handleEdit = (item) => {
        setSelected(item);
      setFirst(item.first_name);
      setMiddle(item.middle_name);
      setLast(item.last_name);
      setBirthday(item.birthday);
      setAge(item.age);
      setReligion(item.religion);
      setContact(item.contact);
      setAddress(item.address);
      setGender(item.gender);
      setCivil(item.civil);
        console.log(selected)
        setOpen(true)
      }
      const handleClose = () => {
        setOpen(false)
      }

      const deleteRecord = (id) => {
        axios.delete(`http://localhost:3003/deleteRecord/${id}`).then((response) => {
          setRecordList(
            recordList.filter((item) => {
              return item.id !== id;
            })
          );
        });
      };
    

  return (
    <div>
        <input
        type="text"
        placeholder="Search"
        onChange={event => setSearchTerm(event.target.value)}
        className='w-[30%] border p-2 mb-4 rounded'
      />
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#2F4858]">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Birthday
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Age
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Gender
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Contact
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Civil
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Religion
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {filteredRecord.map((item, index) => (
  <tr key={`${item.id}-${index}`}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.id}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm text-gray-900">
  {`${item.first_name} ${item.middle_name ? ` ${item.middle_name}` : ''} ${item.last_name}`}
</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
            {new Date(item.birthday).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
    })}
  </div>
</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.age}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.gender}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.contact}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.civil}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.religion}</div>
    </td>
    <td className="px-6 py-4 whitespace-normal">
      <div className="text-sm text-gray-900">{item.address}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap flex flex-row gap-5">
      <div className="text-sm text-gray-900 hover:text-white focus:outline-none focus:shadow-outline-blue bg-transparent hover:bg-[#2F4858] rounded-full p-2 transition duration-200 transform hover:scale-110 cursor-pointer"
      onClick={() => handleEdit(item)}><MdModeEdit /></div>
      <div className="text-sm text-gray-900 hover:text-white focus:outline-none focus:shadow-outline-blue bg-transparent hover:bg-[#2F4858] rounded-full p-2 transition duration-200 transform hover:scale-110 cursor-pointer"
      onClick={() => {
        deleteRecord(item.id);
      }}><MdDelete /></div>
    </td>
  </tr>
))}
        </tbody>
      </table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Please enter the updated details
          </Typography>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              label="First Name"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={middle}
              onChange={(e) => setMiddle(e.target.value)}
              label="Middle Name"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={last}
              onChange={(e) => setLast(e.target.value)}
              label="Last Name"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={dayjs(birthday)}
              onChange={(newDate) => setBirthday(newDate)} />
    </LocalizationProvider>

          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={age}
              onChange={(e) => setAge(e.target.value)}
              label="Age"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              label="Contact"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={civil}
              onChange={(e) => setCivil(e.target.value)}
              label="Civil"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              label="Contact"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              variant="outlined"
            />
          </FormControl>

          <FormControl sx={{ mt: 1, width: '100%' }}>
            <RadioGroup
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          


          <Button
            variant="contained"
            color="primary"
            onClick={() => updateRecord(selected.id, selected.birthday)}
            sx={{ mt: 2, width: '100%' }}
          >
            Update
          </Button>
        </Box>
      </Modal>

    </div>
  )
}

export default Info