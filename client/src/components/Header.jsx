import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";


const Header = () => {
    const path = useLocation().pathname
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
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill >
              <FaRegMoon className='text-xl bg-white'/>
            </Button>
            <Button gradientDuoTone='purpleToBlue'>
                Sign In
            </Button>
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