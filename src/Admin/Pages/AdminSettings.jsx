import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { serverURL } from '../../service/serverURL'
import { toast } from 'react-toastify'
import { updateAdminProfileAPI } from '../../service/allAPI'
import { adminUpdateContext } from '../../Common/ContextAPI/ContextShare'
function AdminSettings() {
const [adminData,setAdminData]=useState(
  {username:"",password:"",confirmpassword:"",profImg:""}
)
const [existingProfile,setExistingProfile] =useState("")
  const [preview,setPreview]=useState("")
    const{setAdminEditResponse}= useContext(adminUpdateContext)
 const handleImageUpload=(e)=>{
    setAdminData({...adminData,profImg:e.target.files[0]})
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleReset=()=>{
    const user=JSON.parse(sessionStorage.getItem("existingUser"))
    console.log(user?.profImg)
    setAdminData({username:user?.username,password:user?.password,confirmpassword:user?.password})
     setExistingProfile(user?.profImg)
     setPreview("")
  }
    const handleProfileUpdate= async ()=>{
       const{username,password,confirmpassword,profImg}=adminData
       if (!username || !password || !confirmpassword  
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
        for (let key in adminData) {
          console.log('aaaa '+ adminData[key]);
            reqBody.append(key, adminData[key])
        }
          const result=await updateAdminProfileAPI(reqBody,reqHeader)
   if (result.status == 200) {
            toast.success(`Updated Sucessfully!!`)
            console.log(result.data);
           sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          
           setAdminEditResponse(result.data)
          }
          else{
            toast.error(`Something went wrong`)
          }
        }
        else{
           const result=await updateAdminProfileAPI({username,password,profImg:existingProfile},reqHeader)
            if (result.status == 200) {
            toast.success(`Updated Sucessfully!!`)
           sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setAdminEditResponse(result.data)
   
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
 console.log('aa '+user?.profImg)
 setAdminData({username:user?.username,password:user?.password,confirmpassword:user?.password,bio:user?.bio})
setExistingProfile(user?.profImg)
}
  },[])

  return (
       <> <AdminHeader/>
    <div className='md:grid grid-cols-5 gap-2' >
<div className='col-span-1' >
<AdminSidebar/>
</div>
<div className='col-span-4 p-10' >
<h1 className='text-center text-3xl font-bold my-5' >Settings</h1>
<div className='md:grid grid-cols-2 gap-5 items-center' >
  <div className='mt-5' >
<p className='text-justify' >
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.

</p>
<p className='text-justify mt-7' >
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit atque qui iure veritatis similique rem tenetur impedit deserunt non. Sequi a nemo ratione quae eaque? Vel rem praesentium nulla.

</p>
  </div>
  <div className='rounded bg-blue-100 p-10 justify-center items-center flex-col mt-10 md:mt=0' >
<div>
  <label htmlFor="proimg" className='flex  justify-center items-center' >
    <input onChange={(e)=>handleImageUpload(e)} type="file" id="proimg" className='hidden' />
   { existingProfile ==""?
     <img width={"100px"} height={"100px"} src={preview?preview: `https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg`}  alt="" style={{borderRadius:"50%"}} />
    :
     <img width={"100px"} height={"100px"} src={preview?preview: `${serverURL}/uploadImg/${existingProfile}`}  alt="" style={{borderRadius:"50%"}} />
   }
  </label>
  <div className='mb-3 w-full' >
<label htmlFor="">Username</label>
<input value={adminData?.username} onChange={(e)=>setAdminData({...adminData,username:e.target.value})}  type="text" placeholder='Enter Username' className='p-2 bg-white border border-gray-200 text-black  w-full rounded placeholder-gray-600' />
  </div>
    <div className='mb-3 w-full' >
<label htmlFor="">Password</label>
<input type="text" value={adminData?.password} onChange={(e)=>setAdminData({...adminData,password:e.target.value})}  placeholder='Enter Password' className='p-2 bg-white border border-gray-200 text-black  w-full rounded placeholder-gray-600' />
  </div>
    <div className='mb-3 w-full' >
<label htmlFor="">Confrim Password</label>
<input type="text" value={adminData?.confirmpassword}  onChange={(e)=>setAdminData({...adminData,confirmpassword:e.target.value})}  placeholder='Enter Confrim Password' className='p-2 bg-white border border-gray-200 text-black  w-full rounded placeholder-gray-600' />
  </div>
  <div className='my-3 w-full flex justify-evenly' >  
    <button  type='button'onClick={handleReset}  className='bg-orange-600 text-white px-4 py-2 rounded' >  Reset</button>
    <button  type='button' onClick={handleProfileUpdate}  className='bg-green-600 text-white px-4 py-2 rounded' >  Update</button>
    

  </div>
</div>
  </div>
</div>
</div>
    </div>
    </>
  )
}

export default AdminSettings