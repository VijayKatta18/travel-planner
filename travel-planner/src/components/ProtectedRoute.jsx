import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({children}) {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    if(!isLoggedIn)
    {
        return <Navigate to="/login" replace state={{form: location.pathname}}></Navigate>
    }
    return children;
}
