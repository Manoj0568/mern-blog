import React,{useState} from 'react'
import {Button, Label, Spinner, TextInput} from 'flowbite-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Oauth from '../components/Oauth'
const Signup = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [formInput,setFormInput] = useState({
    username:"",
    email:"",
    password:""
  })
  const {username,email,password} = formInput
  const onChangeHandler = (e)=>{
     const {id,value} = e.target
     setFormInput({...formInput,[id]:value.trim()})
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
    if(!username || !email || !password || username=='' || email==''|| password==''){
      return toast.error("Feilds can't be empty")
    }
    try {
      setLoading(true)
      await axios.post("/api/auth/signup",formInput, { withCredentials: true })
      setLoading(p=>false)
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
      console.log(error.response.data.message)
    }
  }
  return (
    <div className='min-h-screen w-screen mt-20'>
      <div className='mx-auto w-11/12 sm:w-2/4 md:w-2/5 lg:w-3/12 text-center'>
        <Label value="SIGN UP" className='text-4xl font-extrabold'/>
        <form className='flex flex-col gap-3 py-4'>
          
            <TextInput  type="text" placeholder='Username'value={username} id="username" onChange={onChangeHandler}  />
         
            <TextInput  type="email" placeholder='Email id' value={email} id="email" onChange={onChangeHandler}  />
          
            <TextInput  type="password" placeholder='Password' value={password} id="password" onChange={onChangeHandler}  />
       
        </form>
        <Button outline className="w-full text-3xl py-1 mb-3" gradientDuoTone='purpleToPink' onClick={submitHandler} disabled={loading} >{
        loading?(<><Spinner size='sm'/><span>Loading..</span></>):("SIGN-UP")
      }</Button>
        <Link to='/signin'><p>Having existing account?</p></Link>
        <Oauth/>
      </div>
    </div>
  )
}

export default Signup