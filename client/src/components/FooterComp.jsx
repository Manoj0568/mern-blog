import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin,FaWhatsapp } from 'react-icons/fa'
const FooterComp = () => {
  return (
    <Footer container className='border border-t-8 border-purple-600'>
      <div className='w-full max-w-7xl mx-auto gird-col-2'>
      <div className='grid w-full justify-between sm:flex md:grid-col-1 mb-3'>
      <Link to="/" className='self-center whitespace-nowrap text-xl sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'>Mern</span>
          Blog
        </Link>
      </div>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6'>
         <div>
         <Footer.Title title='About'/>
         <Footer.LinkGroup col>
           <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
             100 Js Projects
           </Footer.Link>
         </Footer.LinkGroup>
         <Footer.LinkGroup col>
           <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
             Mission Vission
           </Footer.Link>
         </Footer.LinkGroup>
         </div>
         <div>
         <Footer.Title title='Follow Us'/>
         <Footer.LinkGroup col>
           <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
             Git Hub
           </Footer.Link>
         </Footer.LinkGroup>
         <Footer.LinkGroup col>
           <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
             NewsLetter
           </Footer.Link>
         </Footer.LinkGroup>
         </div>
         <div>
         <Footer.Title title='Legal'/>
         <Footer.LinkGroup col>
           <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
             Privacy policy
           </Footer.Link>
         </Footer.LinkGroup>
         <Footer.LinkGroup col>
           <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
             Terms & Conditions.
           </Footer.Link>
         </Footer.LinkGroup>
         </div>
      </div>
      <Footer.Divider/>
      <div classname='w-full sm:flex sm:items-center sm:justify-center'>
        <Footer.Copyright href='#' by="Mern blogs" year={new Date().getFullYear()}/>
        <div className='flex gap-6 sm:mt-2 mt-4 sm:justify-center'>
          <Footer.Icon href='#' icon={FaFacebook}/>
          <Footer.Icon href='#' icon={FaInstagram}/>
          <Footer.Icon href='#' icon={FaLinkedin}/>
          <Footer.Icon href='#' icon={FaWhatsapp}/>
        </div>
      </div>
      </div>
    </Footer>
  )
}

export default FooterComp