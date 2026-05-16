import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
 import { FaFacebookF } from "react-icons/fa";
import { serverURL } from '../../service/serverURL';
import { adminUpdateContext } from '../../Common/ContextAPI/ContextShare';
function AdminSidebar() {
    const [profileImage,setProfileImage]=useState("")
       const [username,setUsername]=useState("")
  const{adminEditResponse}=useContext(adminUpdateContext)

       useEffect(()=>
      {if(sessionStorage.getItem("token"))
{ 
const user = JSON.parse(sessionStorage.getItem("existingUser"))
console.log( user );
 console.log('aa '+user?.profImg)
 setUsername( user?.username )
setProfileImage(user?.profImg)
}

      },[adminEditResponse])
  return (
   <>
   <div className='bg-blue-100 md:min-h-screen h-fie md:flex text-center flex-col  py-10' >
<div className='flex justify-center' >
    <img width={"100px"} height={"100px"} style={{borderRadius:"50%"}}  
    src={profileImage==""?"https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg":`${serverURL}/uploadImg/${profileImage}`}
    alt="" />
</div>
<h1 className='mt-3' >{username}</h1>
<div className='md:text-left mx-auto mt-5' >
<div className='mt-5' >
<Link  to={"/admin-dasboard"} className='flex' ><FaFacebookF className='mt-1 me-1' /> Dashboard</Link>
<Link  to={"/admin-books"} className='flex' > <FaFacebookF className='mt-1 me-1' />Books</Link>
<Link  to={"/admin-careers"} className='flex' ><FaFacebookF className='mt-1 me-1' /> Careers</Link>
<Link  to={"/admin-settings"} className='flex' ><FaFacebookF className='mt-1 me-1' /> Settings</Link>
</div>
</div>
   </div>
   </>
  )
}

export default AdminSidebar