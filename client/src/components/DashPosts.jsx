import axios from 'axios'
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const DashPosts = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [userPosts,setUserPosts] = useState([])
    const [showmore,setShowmore] = useState(false)
    useEffect(()=>{
        const fetchPost = async ()=>{
            try {
                const res = await axios.get(`/api/post/getposts?userid=${currentUser._id}`)
                console.log(res)
                if(res.status == 200){
                    console.log(res)
                    console.log(res.data)
                    setUserPosts(res.data.posts)
                    if(res.data.posts.length<9){
                        setShowmore(false)
                    }else{
                        setShowmore(true)
                    }
                }else{
                   console.log("fech post unsuccessful") 
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        if(currentUser.isAdmin){
            fetchPost()
        }
    },[currentUser._id])
   
    const handleShowMore = async()=>{
        const startIndex = userPosts.length
        try {
            const  res = await axios.get(`/api/post/getposts?userid=${currentUser._id}&startIndex=${startIndex}`)

            if(res.status == 200){
                setUserPosts((prev)=>[...prev,...res.data.posts])
                if(res.data.posts.length<9){
                    setShowmore(false)
                }else{
                    setShowmore(true)
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    const handleDelete = async(postId)=>{
       try {
        const res = await axios.delete(`/api/post/delete/${postId}/${currentUser._id}`,{withCredentials:true})
        
        if(res.status == 200){
          setUserPosts(userPosts.filter((post)=>post._id !== postId))
          toast.success("Post delted successfull")
        }
       } catch (error) {
        console.log(error.message)
       }
    }
    
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className='divide-y' key={post._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={()=>handleDelete(post._id)}>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/updatepost/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showmore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  )
}

export default DashPosts