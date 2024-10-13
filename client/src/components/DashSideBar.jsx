import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineLogout } from "react-icons/md";
const DashSideBar = () => {
    const location = useLocation()
    const [tab,setTab] = useState('')

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl){
            setTab(tabFromUrl)
        }
    }),[location.search]
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                   icon={FaUser}
                   label={'User'}
                   labelColor='dark'
                   active={tab === 'profile'}
                   >
                   Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={MdOutlineLogout}>SignOut</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>

    </Sidebar>
  )
}

export default DashSideBar