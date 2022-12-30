import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import {Link, Outlet, useNavigate} from 'react-router-dom'
import axios from "axios";

const Login = () => {

    useEffect( () => {
        let isLogged = localStorage.getItem("isLoggedIn")
        if(isLogged === "loggedIn") {
            navigate('/products')
        }
    },[])

    const [name,setName] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")
    const [showPass , setShowPass] = useState(false)
    const [type , setType] = useState("password")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name.length === 0 || password.length === 0){
            setError("All the fields are mandatory")
        } else {
            setError("")
            const userInfo = {
                "username" : name,
                "password" : password
            }
            
            axios.post("http://localhost:5000/login",userInfo).then((res) => {
                let message = res.data.message
                if(message === "User not found") {
                    setError("Wrong Username or Password")                    
                }  
                else {
                    setError("")
                    localStorage.setItem("isLoggedIn","loggedIn")
                    localStorage.setItem("username",name)
                    navigate("/products")
                }
            }).catch((error) => {
                console.log(error.message)
                localStorage.clear()
                setError("Some Error occured please reload the page")
            })
        }

    }


    return (
        <div>
            <NavBar/>
            <div className="d-flex flex-column  bg-dark mx-auto mt-4 p-1 text-white" style={{width : "60%"}}> 

                <div className="signUpFormTop d-flex justify-content-center align-items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 18 18">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    <h2 className="display-6" style={{marginLeft : "2%"}}>User Login</h2>
                </div>
                <br/>

                <form className="form p-2 d-flex flex-column" style={{width:"100%"}} onSubmit={handleSubmit}>
                    <div className="d-flex flex-row justify-content-center align-items-center " style={{width : '100%'}}>
                        <label className="display-6" >Username </label>
                        <input className="p-2" type="text" placeholder = 'Enter Username' style={{width:"70%",marginLeft : "2%",fontSize : "18px"}}
                            value={name}
                            onChange = {(e) => {
                                setName(e.target.value)
                            }}
                        ></input>
                    </div><br/>

                    <div className="d-flex flex-row justify-content-center align-items-center " style={{width : '100%',marginLeft:"3%"}}>
                        <label className="display-6" >Password </label>
                        <div style={{width:"90%",marginLeft : "4%",fontSize : "18px"}}>
                            <input className="p-2" type={type} placeholder = 'Enter Password' 
                                style={{width:"88%",fontSize : "20px",marginRight:"-2%"}}
                                value={password}
                                onChange={(e)=> {
                                    setPassword(e.target.value)
                                }}    
                            />
                            {showPass === false ? 
                                <svg style={{marginLeft : "3%"}} onClick={()=>{
                                        setShowPass(true)
                                        setType("text")
                                    }}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 18 18">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                                
                              :
                              <svg style={{marginLeft : "3%"}} onClick={()=>{
                                setShowPass(false)
                                setType("password")
                              }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 18 18">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                            }
                        </div>
                        
                    </div><br/>

                    <button  className="btn btn-success p-1 mx-auto " type="submit" style={{width:"60%",fontSize : "20px"}}>Login</button>
                    {error.length > 0 ? <div className="text-danger mx-auto mt-2">{error}</div> : null}

                    <div className="text-left m-2">                        
                        <Link to="/signup">Not a User.?</Link>
                        <Outlet/>
                    </div>
                    
                </form>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#273036" fillOpacity="1" d="M0,64L60,74.7C120,85,240,107,360,133.3C480,160,600,192,720,192C840,192,960,160,1080,144C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
        </div>
    )
}

export default Login