import React, { useContext } from 'react'
import { DataContext } from '../helper/Context'

function Dashboard() {
  const { loggedUser } = useContext(DataContext)
  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 mt-5 bg-white rounded-md shadow-md">
  <div className="flex flex-col items-center mb-4">
    <h2 className="text-2xl font-bold text-gray-900">{`${loggedUser[0].first_name} ${loggedUser[0].middle_name ? ` ${loggedUser[0].middle_name}` : ''} ${loggedUser[0].last_name}`}</h2>
    <p className="text-sm text-gray-600">{loggedUser[0].position}</p>
  </div>
  <div className="flex flex-col mb-4">
    <label className="text-sm text-gray-600 mb-1 font-bold">Email Address:</label>
    <p className="text-sm text-gray-900">{loggedUser[0].email}</p>
  </div>
  <div className="flex flex-col mb-4">
    <label className="text-sm text-gray-600 mb-1 font-bold">Username:</label>
    <p className="text-sm text-gray-900">{loggedUser[0].username}</p>
  </div>
  <div className="flex flex-col mb-4">
    <label className="text-sm text-gray-600 mb-1 font-bold">Gender:</label>
    <p className="text-sm text-gray-900">{loggedUser[0].gender}</p>
  </div>
  <div className="flex flex-col mb-4">
    <label className="text-sm text-gray-600 mb-1 font-bold">Contact Number:</label>
    <p className="text-sm text-gray-900">{loggedUser[0].contactNumber}</p>
  </div>
  <div className="flex flex-col mb-4">
    <label className="text-sm text-gray-600 mb-1 font-bold">ID:</label>
    <p className="text-sm text-gray-900">{loggedUser[0].id}</p>
  </div>

</div>
  )
}

export default Dashboard