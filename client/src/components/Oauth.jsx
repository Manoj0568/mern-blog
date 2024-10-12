import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
const Oauth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const googleClickHandler = async ()=>{
        const auth = getAuth(app)
         const provider = new GoogleAuthProvider()
         provider.setCustomParameters({prompt: 'select_account'})
        try {
            dispatch(signInStart())
            const resultsFromGoogle = await signInWithPopup(auth,provider)

            const payload = {
                username: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl : resultsFromGoogle.user.photoURL
            }

            const res = await axios.post('/api/auth/google',payload,{withCredentials:true})
            if(res.statusText == 'OK'){
                dispatch(signInSuccess(res.data))
                navigate('/')
            }
        } catch (error) {
            dispatch(signInFailure(error))
            console.log(error)
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange'  className='w-full mt-3' onClick={googleClickHandler}>
      <FaGoogle className='w-6 h-6 mr-2'/>
      Continue with google
    </Button>
  )
}

export default Oauth