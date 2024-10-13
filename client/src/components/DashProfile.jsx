import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getStorage, getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
const DashProfile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError,setImageFIleUploadError] = useState(null)
    const filePickerRef = useRef()

    const [imageFileUploading,setImageFileUploading] = useState(false);
    const [updateUserSucess,setUpdateUserSucess]= useState(null);
    const[updateUserError,setUpdateUserError] = useState(null);
    const[formData,setFormData] = useState({})
    const dispatch = useDispatch()
    const handleImageChange =(e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
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
            Update
         </Button>
         <div className='text-red-500 flex justify-between mt-5'>
             <span className='cursor-pointer'>Delete Account</span>
             <span className='cursor-pointer'>SignOut</span>
         </div>
         {
            updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )
         }
       </form>
    </div>
  )
}

export default DashProfile