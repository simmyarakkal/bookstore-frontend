import React from 'react'
import { Link } from 'react-router-dom'

function AdminHeader() {
      const handleLogout = () => {
  sessionStorage.clear();

  // optional
  localStorage.clear();

  navigate("/login");
};
  return (
    
   <>
   <div className='flex justify-between items-center p-3md:px-20 ' >
    <div className='flex items-center'  >
       <img width={"80px"} src="https://www.bing.com/th/id/OIP.DJTlY2KqJDCA7tCB0sxOOAHaF7?w=271&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="" />
                   <h1 className='text-2xl font-bold md:hidden' >BOOKSTORE</h1>
                    <button onClick={handleLogout} type='button' className='border border-black rounded px-3 py-3 ms-2 hover:bg-black hover:text-white'  > LogOut </button>
    </div>
   </div>
   </>
  )
}

export default AdminHeader