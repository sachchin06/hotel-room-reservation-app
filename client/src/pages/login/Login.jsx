import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './login.css'
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })

    const {user,loading,error,dispatch} = useContext(AuthContext)

    const navigate = useNavigate()
    const handleChange = (e)=>{
        setCredentials((prev)=>({ ...prev, [e.target.id]: e.target.value}))
       
    }

    const handleLogin =async (e)=>{
        e.preventDefault()

        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            navigate("/")
            
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE", payload:error.response.data})
        }
    }

  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
            <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
        <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>
        {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}
