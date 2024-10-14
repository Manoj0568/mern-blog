import { Sidebar, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaUser, FaUsers } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineLogout } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { TfiWrite } from "react-icons/tfi";
import axios from 'axios';

const DashSideBar = () => {
    const location = useLocation()
    const [tab,setTab] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,currentUser} = useSelector(state=>state.user)
    const handleSignout = async()=>{
        dispatch(signOutStart())
        try {
           const res = await axios.post(`/api/user/signout`,{withCredentials:true})
           const local = localStorage.getItem('persist:root')
           if(local){
            localStorage.removeItem('persist:root')
           }
           if(res.statusText =='OK'){
            dispatch(signOutSuccess(res.data))
            toast.success("Signed out successfull")
            navigate('/signin')
        }else{
            dispatch(signInFailure(res.data.message))
            toast.error(res.data.message)
        }
        } catch (error) {
            dispatch(signInFailure(error.message))
            toast.error(error.message)
        }
    }

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
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                   as={'div'}
                   icon={FaUser}
                   label={currentUser.isAdmin?"admin":'User'}
                   labelColor='dark'
                   active={tab === 'profile'}
                   >
                   Profile
                </Sidebar.Item>
                </Link>{
                    currentUser.isAdmin && (
                        <>
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item active={tab=='posts'} icon={SiGoogledocs} as='div'>
                                Posts
                            </Sidebar.Item>
                        </Link>
                        <Link to='/createPost'>
                            <Sidebar.Item icon={TfiWrite} as='div'>
                                Create Posts
                            </Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=users'>
                          <Sidebar.Item active={tab == 'users'} as='div' icon={FaUsers}>
                            Users
                          </Sidebar.Item>
                        </Link>
                        </>
                    )
                }
                <Sidebar.Item as={'button'} icon={MdOutlineLogout} onClick={handleSignout}>
                    {loading?<><Spinner size='sm'/><span>Loading..</span></>:"Sign-Out"}
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>

    </Sidebar>
  )
}

export default DashSideBar