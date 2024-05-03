import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../helper/Context';
import axios from 'axios';



function Record() {
    const { recordList, setRecordList} = useContext(DataContext)
  const [searchTerm, setSearchTerm] = useState('')
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3003/records");
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


  const filteredRecord = recordList.filter(record => {
    return record.id?.toString().includes(searchTerm) ||
           record.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           record.middle_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           record.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           record.checked_by?.toLowerCase().includes(searchTerm.toLowerCase())
  })

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
              Checked by
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Temperature
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Pulse
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Oxygen
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Blood Pressure
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {filteredRecord.map((item, index) => (
  <tr key={`${item.id}-${index}`}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.id}</div>
    </td>
    <td className="px-6 py-4 whitespace-normal">
    <div className="text-sm text-gray-900">
  {`${item.first_name} ${item.middle_name ? ` ${item.middle_name}` : ''} ${item.last_name}`}
</div>
    </td>
    <td className="px-6 py-4 whitespace-normal">
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
      <div className="text-sm text-gray-900">{item.checked_by}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.temp}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.pulse}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.oxygen}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{item.bp}</div>
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  )
}

export default Record