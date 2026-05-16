import React, { useState, useEffect } from 'react'
import Header from '../../Common/Components/Header'
import Footer from '../../Common/Components/Footer'
import { FaRegEye } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { getViewBookAPI, makePaymentAPI } from '../../service/allAPI';
import { Link, useParams } from 'react-router-dom';
import { serverURL } from '../../service/serverURL';
import { loadStripe } from '@stripe/stripe-js';

function ViewBooks() {

  const [modalstatus, setModalstatus] = useState(false)
  const [viewBook, setViewBook] = useState({})
  const { id } = useParams()

  const handleBook = async () => {
    console.log('sdfs');
    const strip = await loadStripe('pk_test_51TP3GhDO3lQPEXVrni4b5jGCuzJTJybTgJ6i5WBYnH2fPK2KNH1Q7N0QwwycVmFfArCxN8wK5E91wwUKjN2tTTL7005wFM44p5')
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      try {
        console.log(viewBook);
        const result = await makePaymentAPI(viewBook, reqHeader)
        console.log('aaaaaaa '+result);
        if (result.status === 200) {
          window.location.href = result.data.checkoutSessionURL;
        }

      }
      catch (error) {
        console.log(error);
      }
    }
  }
  const viewAllbooks = async () => {
    const token = sessionStorage.getItem("token")
    console.log(`${token}`)
    //  if (token) {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }


    console.log(`${id}`);
    try {
      const result = await getViewBookAPI(id, reqHeader)

      if (result.status === 200) {
        setViewBook(result.data[0])
        console.log(result.data)
      }
    } catch (error) {
      console.log(error)
    }
    //}
  }

  useEffect(() => {

    viewAllbooks()

  }, [id])
  return (
    <>
      <  Header />
      <div className='md:m-10 m-5' >



        <div className='border p-5 shadow border-gray-200' >
          <div className='md:grid grid-cols-4 gap-x-10' >
            <div>
              <img src={viewBook?.imageURL} alt="" />
            </div>
            <div className='col-span-3' >
              <div className='flex justify-between mt-5 md:mt-0' >
                <h1>   {viewBook?.title}</h1>
                <FaRegEye className='text-2xl' onClick={() => setModalstatus(true)} />
              </div>
              <p>   {viewBook?.author}</p>
              <div className='md:grid grid-cols-3 gap-5 my-10' >
                <p>  Publisher : {viewBook?.publisher}</p>
                <p>language : {viewBook?.language}</p>
                <p>Pages : {viewBook?.noofPages}</p>
                <p>User : {viewBook?.userMail} </p>
                <p>Price :{viewBook?.price} </p>
                <p>ISBN : {viewBook?.isbn} </p>
                <p>Category : {viewBook?.category}</p>
              </div>
              <div className='md:my-10 my-4' >
                <p>
                  {viewBook?.abstract} </p>
              </div>
              <div className='flex justify-end gap-2'>
                <Link to={"/books"} className='bg-blue-900 test-white p-2 rounded-start' >Back</Link>
                <button type='button' className='bg-blue-900 test-white p-2 rounded-start ' onClick={handleBook}  >Buy</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* modal */}
      {modalstatus &&
        <div className='realtive z-10 overflow-y-auto' >
          <div className='bg-gray-500/75 fixed inset-0' >
            <div className='flex justy-center items-center min-h-screen scroll-auto' >
              <div className='bg-white rounded-2xl md:w-250 w-100' >
                <div className='flex justify-between bg-black text-white items-center p-3 ' >
                  <h3>{viewBook?.title} </h3>
                  <IoClose className='text-2xl' onClick={() => setModalstatus(false)} />
                </div>
                <div className='relative p-5' >
                  <p>
                    <FaCamera /> camera Click of the book in the hand of seller
                  </p>
                </div>
                <div className='md:flex flex-wrap gap-5 overflow-y-auto my-4 p-5 justify-center items-center' >
                  {
                    viewBook?.uploadImages?.length > 0 ?
                      viewBook?.uploadImages?.map((img, index) =>
                      (


                        <img key={index} width={"250px"} height={"250px"} src={`${serverURL}/uploadImg/${img}`} alt="" />

                      )) : <h1>No Data</h1>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <  Footer />
    </>
  )
}

export default ViewBooks