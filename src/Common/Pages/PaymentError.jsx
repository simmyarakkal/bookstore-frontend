import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

function PaymentError() {
   return (
      <> 
      <Header/>
      <div className='grid grid-cols-2 py-20 px-40 justify-center items-center' >
          <div>
              <h1 className='text-6xl text-red-700' >
 Sorry! Your Payment is Unsuccessfull...
              </h1>
              <p className='mt-5 mb-10' >We appologize for the inconvinience causedand apperitiateyour visit to Bookstore.
  
              </p>
              <Link className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600' to={"/all-books"} >
              Explore More Books...</Link>
          </div>
  <div>
      <img src='https://www.bing.com/th/id/OIP.YcI88bueLnSUcIrpPFACZgHaHa?w=193&h=193&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' alt='' className='w-3/4 ms-30' ></img>
  </div>
      </div>
      <Footer/>
      </>
    )
}

export default PaymentError