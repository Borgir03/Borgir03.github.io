import React, { useContext } from 'react'
import LOGO from "../assets/LOGO.jpg"
import { DASHBOARD_SIDEBAR_LINKS } from './lib/consts/navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import axios from 'axios'
import { DataContext } from '../helper/Context'

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#86BBD8] hover:no-underline active:bg-[#86BBD8] rounded-sm text-base duration-500'

function Sidebar() {
    const { setUsername, setPassword, setLoggedUser, setLoginStatus, } = useContext(DataContext)
    const logout = () => {
        axios.get("http://localhost:3003/logout").then((response) => {
          if (response.data.success) {
            setUsername("");
            setPassword("");
            setLoggedUser(null);
            setLoginStatus(false);
            localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        });
      };

  return (
    <div className='flex flex-col bg-[#33658A] p-3 w-60 text-white'>
        <div className='flex items-center gap-5 px-1 py-3'>
            <img src={LOGO} className='w-12' />
            <span className='text-lg font-bold'>Nightingle</span>
        </div>
        <div className='flex-1 py-8 flex flex-col gap-2'>
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
        </div>
        <div className="gap-0.5 pt-4 border-t border-neutral-700">
        <button onClick={logout} className="bg-[#413C58] w-[100%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Logout
</button>
        </div>
    </div>
  )
}

export default Sidebar

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-[#86BBD8] text-black' : 'text-white', linkClass)}
		>
			<span className="text-2xl">{link.icon}</span>
			<span className='font-semibold'>{link.label}</span>
		</Link>
	)
}