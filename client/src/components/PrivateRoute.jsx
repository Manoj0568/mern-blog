import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {

    const { currentUser } = useSelector((state) => state.user);
   
    if (!currentUser) {
        localStorage.removeItem('persist:root');
        return <Navigate to='/signin' />;
    }

    return <Outlet />;
  
}

export default PrivateRoute