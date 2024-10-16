import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterComp from "./components/FooterComp"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminProtected from "./components/OnlyAdminProtected"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
import ScrollToTop from "./components/ScrollToTop"
import Search from "./pages/Search"
import { useEffect } from "react"
import axios from "axios"
function App() {
   useEffect(()=>{
    const verifyUser = async()=>{
      console.log("verifying user")
      try {
        const res = await axios.get('/api/auth/get',{withCredentials:true})
      } catch (error) {
        if(error){
          const local = localStorage.getItem('persist:root')
           if(local){
            localStorage.removeItem('persist:root')
           }
           window.location.href='/signin'
           toast.error("session expired")
        }
        console.log(error)
      }
    }

    const intervalId = setInterval(verifyUser, 60000);

    return () => clearInterval(intervalId)
   },[])

  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/projects' element={<Projects/>}/>
       <Route path='search' element={<Search/>}/>
       <Route path="/post/:postslug" element={<PostPage/>}/>
       <Route element={<PrivateRoute/>}>
       <Route path='/dashboard' element={<Dashboard/>}/>
       </Route>
       <Route element={<OnlyAdminProtected/>}>
        <Route path='/createPost' element={<CreatePost/>}/>
        <Route path='/updatepost/:postId' element={<UpdatePost/>}/>
       </Route>
     </Routes>
     <FooterComp/>
     <ToastContainer />
    </BrowserRouter>
  )
}

export default App
