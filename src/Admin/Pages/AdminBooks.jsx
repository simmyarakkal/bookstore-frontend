import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { approveBookAPI, getAllAdminBookAPI, getAllUsesAPI } from '../../service/allAPI'
import { serverURL } from '../../service/serverURL'

function AdminBooks() {
  const [bookListStaus, setBookListStaus] = useState(true)
  const [userListStaus, setUserListStaus] = useState(false)
  const [token, setToken] = useState("")
 const [existingProfile,setexistingProfile]=useState("")
  const [allBooks, setAllBooks] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const approveBook = async (id) => {

  
      try {

        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }

        const result = await approveBookAPI(id,reqHeader)
        console.log(result);
        if (result.status == 200)
        getAllBooks()
      }
      catch (error) {
        console.log(error)
      }
    
  }
  const getAllBooks = async () => {

    if (token) {
      try {

        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }

        const result = await getAllAdminBookAPI(reqHeader)
        console.log(result);
        if (result.status == 200)
          setAllBooks(result.data)
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  
  const getAllUsers = async () => {

    if (token) {
      try {

        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }

        const result = await getAllUsesAPI(reqHeader)
        console.log(result);
        if (result.status == 200)
          setAllUsers(result.data)
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  // Run only once
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token")

    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  // Run when token is ready
  useEffect(() => {
    if (token) {
      getAllBooks()
      getAllUsers()
    }
  }, [token])


  return (
    <> <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2' >
        <div className='col-span-1' >
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10' >
          <h1 className='text-3xl-text-center font-bold' >
            All Collections
          </h1>
          <div className='flex justify-center items-center my-8 font-mediumtext-lg'>
            <p onClick={() => { setUserListStaus(false), setBookListStaus(true) }} className={bookListStaus ? 'text-blue-500 p-4 border-gray-200 border-t border-1 border-r rounded cursor-pointer'
              :
              'p-4 border-gray-200 border-b b cursor-pointer'
            }  >
              Books
            </p>
            <p onClick={() => { setUserListStaus(true), setBookListStaus(false) }} className={userListStaus ? 'text-blue-500 p-4 border-gray-200 border-t border-1 border-r rounded cursor-pointer'
              :
              'p-4 border-gray-200 border-b b cursor-pointer'
            }  >
              User
            </p>
          </div>
          {bookListStaus && <div>
                    <div className='md:grid grid-cols-4 w-full my-5' >
            {
              allBooks?.length>0 ?
              allBooks?.map((book,index)=>(

             
    
              <div className='shadow rounded p-3 mx-4' >
                <img width={"100%"} height={"300px"} src={book?.imageURL} alt="" />
                <div className='flex flex-col justify-center items-center' >
                  <p className='text-blue-700 font-bold text-lg' >
                   {book?.title}
                  </p> <p className='text-red-700 font-bold' > {book?.author}</p>
                  <p className='text-red-700 font-bold' >₹  {book?.discountPrice}</p>
           
             {book?.status =="pending" ?
                  <button type='button' onClick={()=>approveBook(book?._id)} className='w-full mt-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition font-semibold' >
                Approve
                </button>
                :
                book?.status =="approve" ?
                <img style={{ width: "50px", borderRadius: "50px"}} alt="Approved" src='https://static.vecteezy.com/system/resources/previews/023/527/502/original/green-check-mark-icon-symbol-logo-tick-symbol-green-color-transparent-design-free-png.png' ></img>
            :
            <p className='mt-3 text-center text-white bg-red-400 rounded'>SOLD</p>
            }
                  </div>
             </div>
             ))
            :
            <p>No Book added yet</p>
}
 </div>
          </div>
        
        }
          {userListStaus && <div>
             <div className='md:grid grid-cols-4 w-full my-5' >
             {
              allUsers?.length>0 ?
              allUsers?.map((user,index)=>(
           
              <div className='shadow rounded p-3 mx-4' >
                <h1 className='text-red-700' >ID : {user?.username}</h1>

                <div className='flex  justify-between  ' >
                 
                    <img className='w-32 h-32 object-contain rounded-full border-2 border-gray-300 bg-gray-100'  src={user?.profImg==""?"https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg":`${serverURL}/uploadImg/${user?.profImg}`} alt="" />
              
                  <div className='items-center justify-center ' ><p className='text-blue-700 font-bold text-lg' >
                    {user.bio}
                  </p>
                    <p className='text-gray-700 font-bold' >{user?.email}</p>
                  </div>
                </div>
              </div>

           
            
             
              ))
            :
            <p>No User Added</p>
          }</div></div>
        }
          
         

        </div>

      </div>
    </>
  )
}

export default AdminBooks