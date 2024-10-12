import React,{useState} from 'react'
import {Button, Label, Spinner, TextInput} from 'flowbite-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,error} = useSelector(state=>state.user)
  const [formInput,setFormInput] = useState({
    email:"",
    password:""
  })
  const {email,password} = formInput
  const onChangeHandler = (e)=>{
     const {id,value} = e.target
     setFormInput({...formInput,[id]:value.trim()})
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
    if( !email || !password || email==''|| password==''){
      return toast.error("Feilds can't be empty")
    }
    try {
      dispatch(signInStart())
      const data = await axios.post("/api/auth/signin",formInput, { withCredentials: true })
      console.log(data.data)
      dispatch(signInSuccess(data.data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.response.data.message))
      toast.error(error.response.data.message)
      console.log(error.response.data.message)
    }
  }
  return (
    <div className='min-h-screen w-screen mt-20'>
      <div className='mx-auto w-11/12 sm:w-2/4 md:w-2/5 lg:w-3/12 text-center'>
        <Label value="SIGN IN" className='text-4xl font-extrabold'/>
        <form className='flex flex-col gap-3 py-4'>
         
            <TextInput  type="email" placeholder='Email id' value={email} id="email" onChange={onChangeHandler}  />
          
            <TextInput  type="password" placeholder='Password' value={password} id="password" onChange={onChangeHandler}  />
       
        </form>
        <Button outline className="w-full text-3xl py-1 mb-3" gradientDuoTone='purpleToPink' onClick={submitHandler} disabled={loading} >{
        loading?(<><Spinner size='sm'/><span>Loading..</span></>):("SIGN-IN")
      }</Button>
        <Link to='/signin'><p>Create account?</p></Link>
      </div>
    </div>
  )
}

export default Signin