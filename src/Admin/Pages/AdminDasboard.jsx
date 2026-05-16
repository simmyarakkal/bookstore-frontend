import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { FaFacebookF } from "react-icons/fa";
import { getAllAdminBookAPI, getAllUsesAPI } from '../../service/allAPI';
function AdminDasboard() {
 const [allBooks, setAllBooks] = useState([])
  const [allUsers, setAllUsers] = useState([])
    const [token, setToken] = useState("")
  const getAllBooks = async () => {
  
      if (token) {
        try {
  
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
  
          const result = await getAllAdminBookAPI(reqHeader)
          console.log(result);
          if (result.status == 200)
            console.log(result.data);
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
          <div className='md:grid grid-cols-3'  >
            <div className='md:px-5 my-5 md:my-0'  >
              <div className='bg-blue-900 p-4 flex items-center text-2xl rouded text-white' >
                <FaFacebookF />
                <div className='flex ms-2' >
                  <h3>Total No:of  Books</h3>
                  <span className='ms-3' >{allBooks?.length}</span>
                </div>
              </div>
            </div>
            <div className='md:px-5 my-5 md:my-0' >
              <div className='bg-green-900 p-4 flex items-center text-2xl rounded text-white' >
                <FaFacebookF />
                <div className='flex ms-2' >
                  <h3>Total No:of Users :</h3>
                  <span className='ms-3' >{allUsers?.length}</span>
                </div>
              </div>
            </div>
            <div className='md:px-5 my-5 md:my-0' >
              <div className='bg-yellow-900 p-4 flex items-center text-2xl rounded text-white' >
                <FaFacebookF />
                <div className='flex ms-2' >
                  <h3>Job Application :</h3>
                  <span className='ms-3' >50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDasboard