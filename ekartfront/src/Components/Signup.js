import React, { useEffect, useRef, useState } from "react";
import NavBar from './NavBar'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {

    useEffect( () => {
        axios.get("http://localhost:5000/users").then((res) => {
            setUserData(res.data);
        })
        let isLogged = localStorage.getItem("isLoggedIn")
        if(isLogged === "loggedIn") {
            navigate('/products')
        }
    },[])

    const navigate = useNavigate()

    const [usersData , setUserData] = useState({})

    const [email,setEmail] = useState("")

    const [name,setName] = useState("")

    const [password , setPassword] = useState("")

    const [confirmPassword , setConfirmPassword] = useState("")

    const [error , setError] = useState("")

    const [showPass , setShowPass] = useState(false)

    const [type , setType] = useState("password")

    const checkEmail = (userEmail) => {

        if(usersData.length === 0){
            return false;
        }
        for(let i = 0; i < usersData.message.length; i++){
            if(userEmail === usersData.message[i].username){
                return true;
            }
        }
        return false;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let upperCaseCharacters = /[A-Z]+/g
        let lowerCaseCharacters = /[a-z]+/g
        let numberCharacters = /[0-9]+/g
        let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        if(name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            setError("All fields are mandotary")
        } else if(checkEmail(email)) {
            setError("Email id is already used")
        } else if(name.match("[0-9]") || specialCharacters.test(name) === true){
            setError("Name contains invalid character")
        } else if (password !== confirmPassword) {
            setError("Password and Confirm Password are not matching")
        }  else if(upperCaseCharacters.test(password) === false) {
            setError("Password should contain at least an uppercase and a lowercase character, a number and a special character")
        } else if(lowerCaseCharacters.test(password) === false) {
            setError(" Password should contain at least an uppercase and a lowercase character, a number and a special character")
        } else if(numberCharacters.test(password) === false) {
            setError("Password should contain at least an uppercase and a lowercase character, a number and a special character")
        } else if(specialCharacters.test(password) === false) {
            setError("Password should contain at least an uppercase and a lowercase character, a number and a special character")
        } else if(password !== confirmPassword) {
            setError("New Password and Confirm New Password should match")
        }   
        else {
            setError("")
            const userInfo = {
                "username" : email,
                "name" : name,
                "password" : password
            }
            axios.post("http://localhost:5000/signup",userInfo).then((res) => {
                navigate("/login")
            })
            
        }
    }
    return (
        <>
            <NavBar/>
            <div className=" mx-auto bg-dark p-2 mt-3 text-white text-center" style={{width : "70%"}}>
                <div className="signUpFormTop d-flex justify-content-center align-items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 18 18">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    <h2 className="display-6" style={{marginLeft : "2%"}}>User Register</h2>
                </div>
                <div className="form-group">
                    <form className="form p-2" onSubmit={handleSubmit}>

                        {/* Email and Name */}

                        <div className="row text-right ">
                            <div className="col m-2 d-flex flex-column justify-content-left align-items-start" >
                                <label style={{fontSize:"20px",marginBottom:"2%"}}>Email :</label>
                                <input className="p-2 rounded" style={{width:"100%"}} type="email" placeholder="Enter Username"
                                    value={email}
                                    onChange={(event) => {
                                        let val = event.target.value;
                                        setEmail(val);
                                    }}
                                />                            
                            </div>
                            <div className="col m-2 d-flex flex-column justify-content-left align-items-start">
                            <label style={{fontSize:"20px",marginBottom:"2%"}}>Name :</label>
                                <input className="p-2 rounded" style={{width:"100%"}} type="text" value={name} placeholder="Enter Name"
                                    onChange={ (e) => {
                                        let val = e.target.value
                                        setName(val);                                        
                                    }}  
                                />                               
                            </div>
                        </div>
                        

                        {/* Password and Confirm Password */}

                        <div className="row text-right ">
                        <div className="col m-2 d-flex flex-column justify-content-left align-items-start">
                            <label style={{fontSize:"20px",marginBottom:"2%"}}>Password :</label>
                            <div style={{width:"100%"}}>
                                <input className="p-2 rounded" style={{width:"100%"}} type={type} value={password} placeholder="Enter Password"
                                        onChange={ (e) => {
                                            let val = e.target.value
                                            setPassword(val);
                                            
                                        }}  
                                    />
                            </div>
                            {showPass === false ? 
                                <svg style={{marginLeft : "2%",marginTop : "2%"}} onClick={()=>{
                                        setShowPass(true)
                                        setType("text")
                                    }}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 18 18">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                                
                              :
                              <svg style={{marginLeft : "2%",marginTop : "2%"}} onClick={()=>{
                                setShowPass(false)
                                setType("password")
                              }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 18 18">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                            }                                
                            </div>
                            <div className="col m-2 d-flex flex-column justify-content-left align-items-start">
                            <label style={{fontSize:"20px",marginBottom:"2%"}}>Confirm Password :</label>
                                <input className="p-2 rounded" style={{width:"100%"}} type="password" value={confirmPassword} placeholder="Confirm Password"
                                    onChange={ (e) => {
                                        let val = e.target.value
                                        setConfirmPassword(val);                                        
                                    }}  
                                />                                
                            </div>
                        </div>                    

                        {/* REGISTER BUTTON */}
                        <div className="row">
                            <button type="submit" className="btn btn-success mx-auto mt-4" style={{width:'50%'}}>Register</button>
                        </div>
                        {error.length > 0 ? <div className="text-danger mt-2">{error}</div> : null}

                        <div className="text-left m-2">                
                        <Link to="/login ">Already a User.?</Link>
                        
                    </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Signup