import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../helper/Context';
import axios from 'axios';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { Button, Box, FormControl, Modal, TextField, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';



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
  borderRadius: '25px'
};


function List() {
  const { adminList, setAdminList, selected, setSelected } = useContext(DataContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first, setFirst] = useState('');
  const [middle, setMiddle] = useState('');
  const [last, setLast] = useState('');
  const [contact, setContact] = useState('');
  const [position, setPosition] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://mybackend-1a9f650c8ab8.herokuapp.com/admins");
        setAdminList(result.data);
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

  const updateAdmin = (id) => {
    axios.put("https://mybackend-1a9f650c8ab8.herokuapp.com/updateStaff", { 
      id: selected.id,
      first_name: first,
      middle_name: middle,
      last_name: last,
      username: username,
      email: email,
      contact: contact,
      position: position
    }).then(
      (response) => {
        setAdminList(
          adminList.map((val) => {
            return val.id === id
              ? {
                  id: selected.id,
                  first_name: val.first_name,
                  middle_name: val.middle_name,
                  last_name: val.last_name,
                  username: val.username,
                  email: val.email,
                  contact: val.contact,
                  position: val.position
                }
              : val;
          })
        );
        setOpen(false)
      }
    );
  };


  const filteredAdmins = adminList.filter(admin => {
    return admin.id?.toString().includes(searchTerm) ||
           admin.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           admin.middle_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           admin.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           admin.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           admin.position?.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleEdit = (item) => {
    setSelected(item);
  setUsername(item.username);
  setEmail(item.email);
  setFirst(item.first_name);
  setMiddle(item.middle_name);
  setLast(item.last_name);
  setContact(item.contact);
  setPosition(item.position);
    console.log(selected)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  const deleteAdmin = (id) => {
    axios.delete(`https://mybackend-1a9f650c8ab8.herokuapp.com/deleteStaff/${id}`).then((response) => {
      setAdminList(
        adminList.filter((item) => {
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
              First Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Middle Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Position
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Email Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Username
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
              Contact Number
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
          {filteredAdmins.map(item => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.first_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.middle_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.last_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.position}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.gender}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.contact}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex flex-row gap-5">
                <div className="text-sm text-gray-900 hover:text-white focus:outline-none focus:shadow-outline-blue bg-transparent hover:bg-[#2F4858] rounded-full p-2 transition duration-200 transform hover:scale-110 cursor-pointer"
                onClick={() => handleEdit(item)}><MdModeEdit /></div>
                <div className="text-sm text-gray-900 hover:text-white focus:outline-none focus:shadow-outline-blue bg-transparent hover:bg-[#2F4858] rounded-full p-2 transition duration-200 transform hover:scale-110 cursor-pointer"
                onClick={() => {
                  deleteAdmin(item.id);
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
            Please enter your updated details
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
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <TextField
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              label="Contact Number"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <RadioGroup
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <FormControlLabel value="Nurse" control={<Radio />} label="Nurse" />
              <FormControlLabel value="Doctor" control={<Radio />} label="Doctor" />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={updateAdmin}
            sx={{ mt: 2, width: '100%' }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default List