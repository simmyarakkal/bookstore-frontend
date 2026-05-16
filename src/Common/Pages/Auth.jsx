import React, { useContext, useState } from 'react'
import { CgLockUnlock, CgProfile } from "react-icons/cg";
import { IoEyeOff } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { googleLoginAPI, loginAPI, registerAPI } from '../../service/allAPI';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { userAuthContext } from '../ContextAPI/AuthContext';

function Auth({ register }) {

    const [showPassword, setshowPassword] = useState(true)
    const [userData, setUserData] = useState({ username: "", email: "", password: "" })
    const{role,authorisedUser,setAuthorisedUser,setRole}=useContext(userAuthContext)
    const navigate = useNavigate()
    const handleGoogleLogin = async (credentialResponse) => {
        const details = jwtDecode(credentialResponse.credential)
         try {
                const result = await googleLoginAPI({username:details?.name,email:details?.email,password:"googlepassword",profImg: details?. picture})
                if (result.status == 200) {
                    console.log(result);
                    // if (result.data.user.role == "admin") {
                    //     navigate("/admin-dasboard")
                    // }
                    // else {
                        navigate("/")
                    // }
                  //  handleReset()
                    toast.success(`Login Successfully`)
                    setAuthorisedUser(true)
                    setRole(result.data.user.role )
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
                    console.log(result.data)
                    sessionStorage.setItem("token", result.data.token)

                } else if (result.status == 401) {

                    toast.warning(result.response.data)
                } else {
                    toast.error('Something went wrong')
                }
            }

            catch (error) { toast.error(error) }
        
        console.log(details)
    }
    const handleReset = () => {
        setUserData({ username: "", email: "", password: "" })
    }
    const handleRegister = async () => {
        const { username, email, password } = userData;
        if (!username || !email || !password) {
            toast.warning('Enter all details');
        }
        else {//netstat -an | grep 27017

            try {
                const result = await registerAPI(userData)
                console.log(result.status)
                if (result.status == 200) {

                    toast.success("Registered Successfully")
                    handleReset();
                    navigate("/login")
                }
                else if (result.status == 401) {
                    toast.warning("Already registered")
                    navigate("/login")
                }
                else {
                    toast.error('Something went wrong')
                }
            }
            catch (err) {
                toast.error('Something went worng! ' + err)
            }
        }
    }
    const handleLogin = async () => {
        const { email, password } = userData
        if (!email || !password) { toast.info(`Fill Details Completely`) }
        else {
            try {
                const result = await loginAPI(userData)
                if (result.status == 200) {
                    console.log(result);
                    if (result.data.user.role == "admin") {
                        navigate("/admin-dasboard")
                    }
                    else {
                        navigate("/")
                    }
                    handleReset()
                    toast.success(`Login Successfully,`)
                    setAuthorisedUser(true)
                     setRole(result.data.user.role )
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
                    console.log(result.data)
                    sessionStorage.setItem("token", result.data.token)

                } else if (result.status == 401) {

                    toast.warning(result.response.data)
                } else {
                    toast.error('Something went wrong')
                }
            }

            catch (error) { toast.error(error) }
        }
    }
    return (
        <>
            <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url("https://www.bing.com/th/id/OIP.uWCdKht7yzysMusQ9bMEBQHaE8?w=220&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2")] ' >
                <div className='p-10' >
                    <h1 className='text-3xl font-bold text-center'>
                        <Link to="/" >    <FaHome /></Link>  Book Store
                    </h1>

                    <div style={{ width: "400px" }} className='bg-black text-white p-5 flex flex-col justify-center items-center my-5' >
                        <div style={{ width: "100px", height: "100px", borderRadius: "50%" }} className='border mb-5 flex justify-center items-center' >

                            <CgProfile className='text-8xl' />
                        </div>
                        {
                            register ? <h1 className='text2-xl' >Register</h1>
                                :
                                <h1 className='text2-xl' >Login</h1>
                        }


                        <form className='my-5 w-full'  >
                            {register && <div>
                                <label htmlFor="">Username</label>
                                <input type="text" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} placeholder='Enter Username' className='bg-white p-2 w-full rounded placeholder-gray-500 my-5 text-black' />
                            </div>

                            }
                            <div>
                                <label htmlFor="">Email</label>
                                <input type="text" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder='Enter Email' className='bg-white p-2 w-full rounded placeholder-gray-500 my-5 text-black' />
                            </div>
                            <div>
                                <label htmlFor="">Password</label>
                                <input type={showPassword ? "password" : "text"} value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} placeholder='Enter Password' className='bg-white p-2 w-full rounded placeholder-gray-500 my-5 text-black' />
                                {
                                    showPassword ?
                                        <IoEyeOff onClick={() => setshowPassword(false)} style={{ marginLeft: "330px", marginTop: "-53px" }} className='text-gray-500 cursor-pointer text-2xl' /> :
                                        <MdRemoveRedEye onClick={() => setshowPassword(true)} style={{ marginLeft: "330px", marginTop: "-53px" }} className='text-gray-500 cursor-pointer text-2xl' />
                                }
                            </div>

                            <div style={{ marginTop: "15px" }}>
                                <p className='text-xs text-orange-300' >
                                    *Never share your passwordwith others
                                </p>
                            </div>
                            <div className='text-center mt-4' >
                                {register ? <button type='button' onClick={handleRegister} className='bg-green-700 p-2 w-full rounded' >Register</button>
                                    :
                                    <button type='button' onClick={handleLogin} className='bg-green-700 p-2 w-full rounded' >Login</button>
                                }


                            </div>
                            <div>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        handleGoogleLogin(credentialResponse)


                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                            <div className='my-5 text-center' >
                                {register ? <p>Are you already a user? <Link to={"/login"} className='text-orange-300' >Login</Link>  </p>
                                    :
                                    <p>Are you a New User? <Link to={"/register"} className='text-orange-300' >Register</Link>  </p>


                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth