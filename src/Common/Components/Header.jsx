import React, { useEffect, useState } from 'react'
import { TiSocialTwitter } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

function Header() {

    const [listStatus, setListStatus] = useState(false)
    const [dropdownStatus, setDropdownStatus] = useState(false)
    const [token, setToken] = useState("")
    const [uname, setuname] = useState("{}")
     const handleLogout = () => {
  sessionStorage.clear();

  // optional
  localStorage.clear();

  navigate("/login");
};
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)
            setuname(JSON.parse( sessionStorage.getItem("existingUser")).username)
        }
    })
    return (
        <>
            <div className='gird grid-cols-3  ' >

                <div className='flex items-center' >
                    <img width={"80px"} src="https://www.bing.com/th/id/OIP.DJTlY2KqJDCA7tCB0sxOOAHaF7?w=271&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="" />
                    <h1 className='text-2xl font-bold md:hidden' >BOOKSTORE</h1>
                </div>

                <div className='md:flex items-center justify-center hidden' >
                    <h1 className='text-2xl font-bold' >BOOKSTORE</h1>
                </div>
                <div className='md:flex items-center justify-end gap-3 me-5 hidden' >
                    <TiSocialTwitter className='text-2xl' />
                    <FaFacebookF className='text-2xl' />
                    <FaInstagram className='text-2xl' />
                    {!token ?
                        <Link to="/login" > <button className='border border-black rounded px-3 py-3 ms-2 hover:bg-black hover:text-white'  > Login </button></Link>
                        :
                        <div className='relative inline-block text-left' >
                            <button onClick={() => setDropdownStatus(!dropdownStatus)} className='w-full justify-center  items-center flex bg-white px-3 py-2 shadow-xs hover:bg-gray-50' >
                                <img src="https://www.bing.com/th/id/OIP.zSjnJGFe_TxQyoSX48_Z6wHaHa?w=170&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="Profile Image" width={"40px"} height={"40px"} className='mx-2' />
                                <span>{uname}</span></button>
                                {
                                    dropdownStatus &&
                                    <div className='absolue right-0 z-10 mt-2 w-40 orgin-top-right rounded-md bg-white shadow-lg' >
                                        <div className='py-1' >
                                            <Link to={"/profile"} className='block px-4 py-2 text-sm text-gray-700' >profile</Link>
                                           <button type='button' onClick={handleLogout} className='block px-4 py-2 text-sm text-gray-700' >   Logout </button>
                                        </div>

                                    </div>
                                }
                            
                        </div>
                    }

                </div>
                <nav className='w-full bg-black p-3 mt-3 text-white md:flex justify-center items-center' >
                    <div className='flex justify-between items-center text-2xl md:hidden'>
                        <button onClick={() => setListStatus(!listStatus)} ><GiHamburgerMenu /></button>
                        <Link to="/login" > <button className='border border-black rounded px-3 py-3 ms-2 hover:bg-black hover:text-white'  > Login </button></Link>

                    </div>

                    <ul className={listStatus ? 'flex flex-col' : 'md:flex justify-center items-center hidden'} >
                        <li className='mx-4' ><Link to='/'  >Home</Link>
                        </li>
                        <li className='mx-4' ><Link to='/books'  >Books</Link>
                        </li>
                        <li className='mx-4' ><Link to='/careers'  >Careers</Link>
                        </li>
                        <li className='mx-4' ><Link to='/contact'  > Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Header