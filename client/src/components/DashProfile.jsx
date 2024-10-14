import { Alert, Button, Modal, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getStorage, getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signInFailure, signOutStart, signOutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
const DashProfile = () => {
    const {currentUser,error} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError,setImageFIleUploadError] = useState(null)
    const filePickerRef = useRef()
    const {loading} = useSelector(state=>state.user)
    const [imageFileUploading,setImageFileUploading] = useState(false);
    const [updateUserSucess,setUpdateUserSucess]= useState(null);
    const[updateUserError,setUpdateUserError] = useState(null);
    const[formData,setFormData] = useState({})
    const[showModal,setShowModal] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleImageChange =(e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    const handleDeleteUser = async ()=>{
        setShowModal(false)
        try {
            dispatch(deleteUserStart())
            const res = await axios.delete(`/api/user/delete/${currentUser._id}`,formData,{withCredentials:true})

            if(res.statusText=='OK'){
                dispatch(deleteUserSuccess())
            }else{
                dispatch(deleteUserFailure(res.data.message))
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }
    const uploadImage = async()=>{
        console.log("working here")
        setImageFileUploading(true)
        setImageFIleUploadError(null)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef,imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) =>{
                const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error)=>{
                console.log(error)
                setImageFIleUploadError("could not upload image (File must be less than 2MB)")
                setImageFileUploadProgress(null)
                setImageFile(null)
                setImageFileUrl(null)
                setImageFileUploading(false)
                toast.error("could not upload image (File must be less than 2MB)")
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    setImageFileUrl(downloadUrl)
                    setFormData({...formData,profilePicture:downloadUrl})
                    setImageFileUploading(false)
                    console.log(downloadUrl)
                })
            }
        )

    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setUpdateUserError(null)
        setUpdateUserSucess(null)
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes Made');
            return
        }
        if(imageFileUploading){
            setUpdateUserError('Please wait for image for upload')
            return
        }
        try {
            dispatch(updateStart());
            const res = await axios.put(`/api/user/update/${currentUser._id}`,formData,{withCredentials:true})
            console.log(res)
            if(res.statusText =='OK'){
                dispatch(updateSuccess(res.data))
                setImageFileUploadProgress(null)
                toast.success("Update Successfull")
                setUpdateUserSucess("user's profile updated successfull")
            }else{
                dispatch(updateFailure(res.data))
                setUpdateUserError(res.data.message)
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
            toast.error(error.message)
        }
    }

    const handleSignout = async()=>{
        dispatch(signOutStart())
        try {
           const res = await axios.post(`/api/user/signout`,formData,{withCredentials:true})
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
       if(imageFile){
        uploadImage()
       }
    },[imageFile])
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
         <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative' onClick={()=>filePickerRef.current.click()}>
            {imageFileUploadProgress && (
                <CircularProgressbar
                   value={imageFileUploadProgress || 0}
                   text={`${imageFileUploadProgress}%`}
                   strokeWidth={5}
                   styles={{
                    root:{
                        widht: '8rem',
                        height:'8rem',
                        position: 'absolute',
                        top:0,
                        left:0,
                    },
                    path:{
                       stroke: `rgba(62,152,100, ${imageFileUploadProgress/100})`
                    }
                   }}
                />
            )}
            <img src={imageFileUrl || currentUser.profilePicture} alt="user img" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`} />
         </div>
         {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
         <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
         <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
         <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            {loading?<><Spinner size='sm'/><span>Loading..</span></>: "Update"}
         </Button>
         <div className='text-red-500 flex justify-between mt-5'>
             <span className='cursor-pointer' onClick={()=>setShowModal(true)}>{
                loading? <><Spinner size='sm'/><span>Loading..</span></> :"Delete Account"
                }</span>
             <span className='cursor-pointer' onClick={handleSignout}>
                {loading?<><Spinner size='sm'/><span>Loading..</span></>:"Sign-out"}
             </span>
         </div>
         
       </form>
       {
        currentUser.isAdmin && (
            <Link to={"/createPost"}>
                <Button type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'>
                    Create a Post
                </Button>
            </Link>
        )
       }
       {
            updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )
         }{
            error && (
                <Alert color='failure' className='mt-5'>{error}</Alert>
            )
         }
       <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile