import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import './App.css'
import './index.css'
import Home from './Common/Pages/Home'
import Auth from './Common/Pages/Auth'
import Contact from './Common/Pages/Contact'
import Careers from './Common/Pages/Careers'
import Books from './Users/Pages/Books'
import Profile from './Users/Pages/Profile'
import ViewBooks from './Users/Pages/ViewBooks'
import AdminBooks from './Admin/Pages/AdminBooks'
import AdminCareers from './Admin/Pages/AdminCareers'
import AdminDasboard from './Admin/Pages/AdminDasboard'
import AdminSettings from './Admin/Pages/AdminSettings'
import Pnf from './Common/Pages/Pnf'
import PreLoader from './Common/Pages/PreLoader'
import { ToastContainer } from 'react-toastify'
import PaymentError from './Common/Pages/PaymentError'
import PaymentSuccess from './Common/Pages/PaymentSuccess'
import { userAuthContext } from './Common/ContextAPI/AuthContext'

function App() {
   const{role }=useContext(userAuthContext)
  const [loading, setLoading] = useState(true)
  useEffect(
    ()=>
    {
      setInterval(() => {
        setLoading(false)
      }, 5000);
    },[]
  )
  
  return (
    <>
      <Routes>
        {/* common */}
        <Route path='/' element={loading?<PreLoader/> :<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/careers' element={<Careers />} />
        {/* user */}
        {role =="user" &&
        <>
        <Route path='/books' element={<Books />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/view-book/:id/book' element={<ViewBooks />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentError />} />
        </>
}
        {/* admin */}
         {role =="admin" &&
        <>
 <Route path='/admin-books' element={<AdminBooks />} />
 <Route path='/admin-dasboard' element={<AdminDasboard />} />
 <Route path='/admin-careers' element={<AdminCareers />} />
 <Route path='/admin-settings' element={<AdminSettings />} />
  </>
}
 <Route path='/*' element={<Pnf />} />

      </Routes>
      <ToastContainer
position="top-center"
autoClose={5000}
theme="colored"
 
/>
    </>
  )
}

export default App
