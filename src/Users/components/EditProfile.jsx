import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { updateProfileAPI } from '../../service/allAPI';
import { toast } from 'react-toastify';
import { serverURL } from '../../service/serverURL';
import { useContext } from 'react';
import { userUpdateContext } from '../../Common/ContextAPI/ContextShare';
 
//<MdModeEditOutline />
function EditProfile() {
  const [offcanvas,setOffcanvas]=useState(false)
  const[userDetails,setUserDetails]=useState({username:"",password:"",confirmpassword:"",bio:"",profImg:""})
  const [preview,setPreview]=useState("")
  const [existingProfile,setexistingProfile]=useState("")
  const{setuserEditResponse}= useContext(userUpdateContext)
  const handleImageUpload=(e)=>{
    setUserDetails({...userDetails,profImg:e.target.files[0]})
    setPreview(URL.createObjectURL(e.target.files[0]))
  }
const handleReset=()=>{
  const user=JSON.parse(sessionStorage.getItem("existingUser"))
  console.log(user?.profImg)
  setUserDetails({username:user?.username,password:user?.password,confirmpassword:user?.password,bio:user?.bio})
   setexistingProfile(user?.profImg)
   setPreview("")
}
  const handleProfileUpdate= async ()=>{
     const{username,password,confirmpassword,bio,profImg}=userDetails
     if (!username || !password || !confirmpassword || !bio  
    ) {
      toast.info(`Enter Details completely`)
    }
    else {
      if(password !=confirmpassword)
      {
        toast.warning(`Mismatch in Password and Confirm Password`)
      }
      else{
try {
  const token=sessionStorage.getItem("token")
   const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      if(preview)
      {
         const reqBody = new FormData()
      //reqBody.append("title",title)
      for (let key in userDetails) {
        console.log('aaaa '+ userDetails[key]);
          reqBody.append(key, userDetails[key])
      }
        const result=await updateProfileAPI(reqBody,reqHeader)
 if (result.status == 200) {
          toast.success(`Updated Sucessfully!!`)
          console.log(result.data);
         sessionStorage.setItem("existingUser",JSON.stringify(result.data))
         setOffcanvas(false)
         setuserEditResponse(result.data)
        }
        else{
          toast.error(`Something went wrong`)
        }
      }
      else{
         const result=await updateProfileAPI({username,password,bio,profImg:existingProfile},reqHeader)
          if (result.status == 200) {
          toast.success(`Updated Sucessfully!!`)
         sessionStorage.setItem("existingUser",JSON.stringify(result.data))
         setuserEditResponse(result.data)
         setOffcanvas(false)
        }
        else{
          toast.error(`Something went wrong`)
        }
      }
     
        
       
      //   else if (result.status == 401) {
      //     toast.warning(result.response.data)
      //   }
      //   else {
      //     toast.error('Something went wrong')
      //   }
      // }
    }
      catch (error) {
        console.log(error)
      }
    
  }
}
}

  useEffect(()=>
  {
   
if(sessionStorage.getItem("token"))
{ 
const user = JSON.parse(sessionStorage.getItem("existingUser"))
console.log( user );
 console.log('aa '+user?.username)
 setUserDetails({username:user?.username,password:user?.password,confirmpassword:user?.password,bio:user?.bio})
setexistingProfile(user?.profImg)
}
  },[])
  return (
    <>
      <button className='flex px-4 py-2 font-bold border border-blue-200 text-blue-600 rounded' onClick={()=>setOffcanvas(true)}>
        <MdModeEditOutline className='mt-1 me-2' /> Edit
      </button>
      <div>
        { offcanvas &&
        <>
        <div className='fixed inset-0 bg-gray-500/75 w-full h-full' >

        </div>
        <div className='bg-white h-full w-90 z-50 fixed top-0 left-0' >
          <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl' >
            <h1>Edit User Profile</h1>
            <button onClick={()=>setOffcanvas(false)}>X</button>
          </div>
          <div className='flex justify-center items-center flex-col my-5' >
            <label htmlFor='profilepic' >
              <input onChange={(e)=>handleImageUpload(e)} type='file' style={{ display: "none" }} id='profilepic' ></input>
              <img src={preview?preview :`${serverURL}/uploadImg/${existingProfile}`} style={{ height: "150px", width: "150px", borderRadius: "50%" }} alt="" ></img>
            </label>
          </div>
           <div className='mt-10 mb-3 w-full px-5' >
            <input value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}  type="text" placeholder='UserName' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded ' / >
          </div>
            <div className='mt-10 mb-3 w-full px-5' >
            <input value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}  type="text" placeholder='Password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded ' / >
          </div>
             <div className='mt-10 mb-3 w-full px-5' >
            <input value={userDetails.confirmpassword} onChange={(e)=>setUserDetails({...userDetails,confirmpassword:e.target.value})}  type="text" placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded '  />
          </div>
          <div className='mt-10 mb-3 w-full px-5' >
            <textarea value={userDetails.bio} onChange={(e)=>setUserDetails({...userDetails,bio:e.target.value})} type="text" placeholder='Bio' className='w-full border border-gray-300 placeholder-gray-500 p-2 rouded '  ></textarea>
          </div>
          <div className='flex justify-end w-full px-5' >
            <button type='button'onClick={handleReset}  className='bg-amber-600 text-white rounded border py-3 px-4 hover:text-amber-600 hover:borde-amber-600  hover:bg-white' >Reset</button>
            <button type='button' onClick={handleProfileUpdate} className='bg-green-600 text-white rounded border py-3 px-4 hover:text-green-600 hover:borde-green-600  hover:bg-white ms-3' >Update</button>
          </div>
        </div>
        </>
}
      </div>
    </>
  )
}

export default EditProfile