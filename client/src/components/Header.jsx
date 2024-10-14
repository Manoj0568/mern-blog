import { Avatar, Button, Dropdown, Navbar, Spinner, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaRegMoon,FaRegSun } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux'
import { FiLogOut } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { toggleTheme } from '../redux/theme/themeSlice';
import { signInFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
const Header = () => {
    const path = useLocation().pathname
    const navigate = useNavigate()
    const currentUser = useSelector(state=>state.user).currentUser
    const {theme} = useSelector(state=>state.theme)
    const dispatch = useDispatch()
    const themeClickHandler =()=>{
       dispatch(toggleTheme())
    }
     const {loading} = useSelector(state=>state.user)
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
  return (
    <Navbar className='border-b-2 '>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'>Mern</span>
          Blog
        </Link>
        <form>
            <TextInput type='text' placeholder='Search...' rightIcon={FaSearch} className='hidden  lg:inline' />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray'>
            <FaSearch className='text-xl'/>
        </Button>
        <div className='flex gap-2 md:order-2 '>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={themeClickHandler} >
              {theme=='light'?<FaRegMoon className='text-xl'/>:<FaRegSun className='text-xl'/>}
            </Button>
            {currentUser? (
                <Dropdown arrowIcon={false}
                   inline
                   label={
                    <Avatar 
                      alt='user'
                      img={currentUser.profilePicture}
                      rounded
                    />
                   }
                >
                <Dropdown.Header>
                    <span className='block text-sm font-medium'>@{currentUser.username}</span>
                    <span className='block text-sm truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to={`/dashboard?tab=profile`}>
                  <Dropdown.Item icon={RxAvatar}>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item icon={FiLogOut} onClick={handleSignout}>
                  {loading?<><Spinner size='sm'/><span>Loading..</span></>:"Sign-Out"}
                </Dropdown.Item>
                </Dropdown>
            ):( <Link to="/signin"><Button gradientDuoTone='purpleToBlue' outline >
                Sign In
            </Button></Link>)}
            
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
        <Link to='/'><Navbar.Link  active={path==="/"} as={'div'}>
                Home
            </Navbar.Link></Link>
            <Link to='/about'> <Navbar.Link active={path=='/about'} as={'div'}>
                About
            </Navbar.Link></Link>
            <Link to='/projects'><Navbar.Link active={path=="/projects"} as={'div'}>
                Projects
            </Navbar.Link></Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header