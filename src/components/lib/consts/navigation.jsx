import { FaPeopleGroup } from 'react-icons/fa6'
import { IoPersonAdd, IoSpeedometerOutline } from 'react-icons/io5'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'home',
		label: 'Home',
		path: '/dashboard/start',
		icon: <IoSpeedometerOutline />
	},
	{
		key: 'list',
		label: 'Staffs',
		path: '/dashboard/start/list',
		icon: <FaPeopleGroup />
	},
	{
		key: 'addStaff',
		label: 'Add Staff',
		path: '/dashboard/start/addStaff',
		icon: <IoPersonAdd />
	},
	{
		key: 'records',
		label: 'Records',
		path: '/dashboard/start/records',
		icon: <FaPeopleGroup />
	},
    {
		key: 'addRecord',
		label: 'Add Record',
		path: '/dashboard/start/addRecords',
		icon: <IoPersonAdd />
	},
	{
		key: 'patient',
		label: 'Patient Info',
		path: '/dashboard/start/patientinformation',
		icon: <FaPeopleGroup />
	},

]