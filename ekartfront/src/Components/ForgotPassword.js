import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate} from 'react-router-dom'
import { Form, InputGroup,Button } from "react-bootstrap";
import axios from "axios";
import { Fade , Alert } from "react-bootstrap";

const ForgotPassword = () => {

    useEffect( () => {
        let isLogged = localStorage.getItem("isLoggedIn")

        if(isLogged === null || isLogged === 'null') {
            navigate('/login')
        }
    },[])

    const name = localStorage.getItem("username")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")
    const [showAlert , setShowAlert] = useState(false)
    const [message , setMessage] = useState("")

    const [showPass1 , setShowPass1] = useState(false)
    const [type1 , setType1] = useState("password")
    const [showPass2 , setShowPass2] = useState(false)
    const [type2 , setType2] = useState("password")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        let upperCaseCharacters = /[A-Z]+/g
        let lowerCaseCharacters = /[a-z]+/g
        let numberCharacters = /[0-9]+/g
        let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

        if(name.length === 0 || password.length === 0){
            setError("All the fields are mandatory")
        } else if(upperCaseCharacters.test(password) === false) {
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
                "password" : password
            }
            axios.post(`http://localhost:5000/${name}/update`,userInfo).then((res) => {
                let message = res.data.message
                setShowAlert(true)
                
                if(message === "Password Changed Succesfully") {
                    setMessage("Password changed you will be logged out Sign In with new credentials")
                    setTimeout(() => {
                        localStorage.clear()
                        navigate("/login")
                    }, 3000);
                } else {
                    setMessage(message)
                }
            }).catch((error) => {
                console.log(error.message)
                setError("Some Error occured please reload the page")
            })
        }

    }


    return (
        <div>
            {showAlert === true ?
                    <Fade appear={true} in={showAlert} onExited={showAlert} >
                        <Alert id="example-fade-text" transition="fade" style={{width:"fit-content",position:"fixed",left:"35%",top:"2%",zIndex:"2"}} className="text-center" variant="success" onClose={() => setShowAlert(false)} dismissible>
                            {message}
                        </Alert>
                    </Fade>
                     : null
            }
            <NavBar searchChange={null}/>
            <div className="d-flex flex-column  bg-dark mx-auto mt-4 p-1 text-white" style={{width : "60%"}}> 

                <div className="signUpFormTop d-flex justify-content-center align-items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 18 18">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    <h2 className="display-6" style={{marginLeft : "2%"}}>Update Password</h2>
                </div>
                <br/>

                <form className="form p-2 d-flex flex-column" style={{width:"100%"}} onSubmit={handleSubmit}>
                    <div className="d-flex flex-column justify-content-start align-items-start " style={{width : '100%'}}>
                        <label className="display-6" style={{width:"100%",marginLeft : "2%"}} >Password </label>
                        <div style={{width:"90%",marginLeft : "2%",fontSize : "18px"}}>
                            <input style={{width:"90%",background : "transparent"}} className="p-2 mt-1 bg-light" type={type1} placeholder = 'New Password'
                                value={password}
                                onChange = {(e) => {
                                        setPassword(e.target.value)
                                    }}
                                 />
                            {showPass1 === false ? 
                                <svg style={{marginLeft : "1%"}} onClick={()=>{
                                        setShowPass1(true)
                                        setType1("text")
                                    }}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 18 18">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                                
                              :
                              <svg style={{marginLeft : "1%"}} onClick={()=>{
                                setShowPass1(false)
                                setType1("password")
                              }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 18 18">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                            }
                        </div>
                        
                    </div><br/>

                    <div className="d-flex flex-column justify-content-start align-items-start " style={{width : '100%'}}>
                        <label className="display-6" style={{width:"100%",marginLeft : "2%"}} >Confirm Password </label>
                        <div style={{width:"90%",marginLeft : "2%",fontSize : "18px"}}>
                            <input style={{width:"90%",background : "transparent"}} className="p-2 mt-1 bg-light" type={type2} placeholder = 'Confirm Password'                             
                                value={confirmPassword}
                                onChange={(e)=> {
                                    setConfirmPassword(e.target.value)
                                }}    
                            />
                            {showPass2 === false ? 
                                <svg style={{marginLeft : "1%"}} onClick={()=>{
                                        setShowPass2(true)
                                        setType2("text")
                                    }}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 18 18">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                                
                              :
                              <svg style={{marginLeft : "1%"}} onClick={()=>{
                                setShowPass2(false)
                                setType2("password")
                              }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 18 18">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                            }
                        </div>
                    </div><br/>

                    <button  className="btn btn-success p-1 mx-auto m-2 " type="submit" style={{width:"60%",fontSize : "20px"}}>Change Password</button>
                    {error.length > 0 ? <div className="text-danger mx-auto mt-2">{error}</div> : null}
                    
                </form>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="">
                <path fill="#273036" fillOpacity="1" d="M0,64L60,74.7C120,85,240,107,360,133.3C480,160,600,192,720,192C840,192,960,160,1080,144C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
        </div>
    )
}

export default ForgotPassword