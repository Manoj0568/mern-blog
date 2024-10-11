import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
 

  return (
    <BrowserRouter>
    <Header/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/projects' element={<Projects/>}/>
     </Routes>
     <ToastContainer />
    </BrowserRouter>
  )
}

export default App
