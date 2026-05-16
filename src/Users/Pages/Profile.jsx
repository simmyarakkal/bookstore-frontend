import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Common/Components/Header'
import { MdVerified } from "react-icons/md";
import EditProfile from '../components/EditProfile';
import { addBookAPI, getuserAllBookAPI, removeBookAPI, getPurchaseBookAPI } from '../../service/allAPI';
import { toast } from 'react-toastify';
import { serverURL } from '../../service/serverURL';
import { userUpdateContext } from '../../Common/ContextAPI/ContextShare';

function Profile() {
  const [sellBookStatus, setSellBookStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseHistory, setPurchaseHistory] = useState(false)
  const [bookDetails, setBookDetails] = useState({
    title: "", author: "", noofPages: "", imageURL: "", price: "", discountPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
  })
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [token, setToken] = useState("")
  const [username, setusername ]= useState("")
   const [userBio, setuserBio] = useState("")
   const [userProfileImage, setuserProfileImage] = useState("")
     const{userEditResponse}=useContext(userUpdateContext)
  const handleUploadBookImage = (e) => {
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })

    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)

    const bookIageArray = previewList
    bookIageArray.push(url)
    setPreviewList(bookIageArray)
  }
  const handleReset = () => {
    setBookDetails({ title: "", author: "", noofPages: "", imageURL: "", price: "", discountPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: [] }
    )
    setPreview("")
    setPreviewList([])
  }
  const hadleAddBook = async () => {
    const {
      title, author, noofPages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImages
    } = bookDetails
    if (!title || !author || !noofPages || !imageURL || !price || !discountPrice || !abstract || !publisher || !language || !isbn || !category || uploadImages.length == 0
    ) {
      alert(`Fill all details`)
    }
    else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const reqBody = new FormData()
      //reqBody.append("title",title)
      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        }
        else {
          bookDetails.uploadImages.forEach(img => {
            reqBody.append("uploadImages", img)
          })
        }
      }
      try {
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success(`Book added Sucessfully!!`)
          handleReset();
        }
        else if (result.status == 401) {
          toast.warning(result.response.data)
        }
        else {
          toast.error('Something went wrong')
        }
      }
      catch (error) {
        console.log(error)
      }
    }
  }





  const [userBooks, setUserBooks] = useState([])
  const getUserBooks = async () => {
    if (token) {
      try {

        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }

        const result = await getuserAllBookAPI(reqHeader)
        setUserBooks(result.data)
        console.log(result);

      }
      catch (error) {
        console.log(error)
      }
    }
  }
  // remove
  const removeBook = async (id) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await removeBookAPI(id, reqHeader)
      if (result.status = 200) {
        toast.success(result.data)
        getUserBooks()
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const [purchaseBooks, setPurchaseBooks] = useState([])
  const getPurchaseBooks = async () => {
    if (token) {
      try {

        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }

        const result = await getPurchaseBookAPI(reqHeader)
        setPurchaseBooks(result.data)
        console.log(result);

      }
      catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    getUserBooks()
   
  }, [bookStatus])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    getPurchaseBooks()
  }, [purchaseHistory]) 

    useEffect(() => {
    if (sessionStorage.getItem("token")) {
     const user =JSON.parse(sessionStorage.getItem("existingUser"))
     console.log(user);
     setusername(user?.username)
     setuserBio(user?.bio)
     setuserProfileImage(user?.profImg)

    }
    
  }, [userEditResponse])
  return (
    < >
      <Header />
      <div className='bg-black w-full h-40 sm:h-52' ></div>
      <div className='flex justify-center sm:justify-start px-4 sm:px-16 -mt-20' >
        <div className='bg-white  p-2 rounded-full w-40 h-40 sm:w-56 shadow-lg  ' >
          <img className='w-full h-full rounded-full object-cover' 
          src={userProfileImage =="" ?"https://www.bing.com/th/id/OIP.zSjnJGFe_TxQyoSX48_Z6wHaHa?w=170&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" 
            :
            `${serverURL}/uploadImg/${userProfileImage}`
          }
         alt="" />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-between px-4 sm:px-16 mt-6' >
        <div className='flex items-center justify-center sm:justify-start' >
          <h1 className='font-bold text-2xl sm:text-3xl' >{username} </h1>
          <MdVerified className='text-blue-500  ms-2 text-xl sm:text-2xl' />

        </div>
        <div className='flex justify-center sm:justify-end mt-3 sm:mt-0' >
          <EditProfile />
        </div>
      </div>
      <p className='px-4 sm:px-16 my-5 text-justify' >
      {userBio}  </p>
      {/* tab section */}
      <div className='flex justify-center items-center my-8 font-medium text-lg gap-2' >
        <p onClick={() => { setSellBookStatus(true), setBookStatus(false), setPurchaseHistory(false) }} className={sellBookStatus ? 'text-blue-500 p-4 border-gray-200 border rounded cursor-pointer'
          : 'p-4 border-b  border-gray-200 cursor-pointer'}  >
          Sell Book
        </p>
        <p onClick={() => { setSellBookStatus(false), setBookStatus(true), setPurchaseHistory(false) }} className={bookStatus ? 'text-blue-500 p-4 border-gray-200 border rounded cursor-pointer'
          : 'p-4 border-b  border-gray-200 cursor-pointer'}  >
          Book Status
        </p>
        <p onClick={() => { setSellBookStatus(false), setBookStatus(false), setPurchaseHistory(true) }} className={purchaseHistory ? 'text-blue-500 p-4 border-gray-200 border rounded cursor-pointer'
          : 'p-4 border-b  border-gray-200 cursor-pointer'}  >
          Purchase History
        </p>
      </div>
      {sellBookStatus &&
        <div>
          <div className='p-10 my-20 mx-5 bg-gray-200' >
            <h1 className='text-center text-3xl font-medium' > Book Details </h1>
            <div className='md:grid grid-cols-2 mt-10 w-full' >
              <div className='px-3' >
                <div className='mb-3' >
                  <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.noofPages} onChange={(e) => setBookDetails({ ...bookDetails, noofPages: e.target.value })} type="text" placeholder='No.of Pages' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.imageURL} onChange={(e) => setBookDetails({ ...bookDetails, imageURL: e.target.value })} type="text" placeholder='Image URL' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.discountPrice} onChange={(e) => setBookDetails({ ...bookDetails, discountPrice: e.target.value })} type="text" placeholder='Discount Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} placeholder='Abstract' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white'></textarea>

                </div>

              </div>
              <div className='px-3' >
                <div className='mb-3' >
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3' >
                  <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                </div>
                <div className='mb-3 flex justify-center items-center mt-10' >
                  {!preview ?
                    <label htmlFor="bookImage">
                      <input onChange={(e) => handleUploadBookImage(e)} type="file" id='bookImage' className='hidden' />
                      <img src="https://th.bing.com/th/id/OIP.4Rsx-wnQuNBlVfRy9O7N2gHaHa?w=165&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="bookImage" width={"200px"} height={"200px"} />
                    </label> :
                    <img src={preview} alt="bookImage" width={"150px"} height={"200px"} />
                  }
                </div>
                {preview &&
                  <div className='flex justify-center items-center  gap-2'>

                    {previewList?.map((imgurl, index) => (
                      <img src={imgurl} key={index} alt="bookImage" width={"70px"} height={"200px"} />

                    ))
                    }
                    {previewList.length < 3 && <label htmlFor="bookImage">
                      <input onChange={(e) => handleUploadBookImage(e)} type="file" id='bookImage' className='hidden' />
                      <img src="https://th.bing.com/th/id/OIP.4Rsx-wnQuNBlVfRy9O7N2gHaHa?w=165&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="bookImage" width={"70px"} height={"70px"} />
                    </label>
                    }
                  </div>
                }
              </div>
            </div>
            <div className='p-3 w-full flex md:justify-end justify-center mt-8'>
              <button type='button' onClick={handleReset} className='py-2 px-3 rounded bg-orange-600 text-white hover:bg-white hover:border hover:text-black' >Reset
              </button>
              <button type='button' onClick={hadleAddBook} className='py-2 px-3 rounded bg-green-600 text-white hover:bg-white hover:border hover:text-black' >Submit
              </button>
            </div>
          </div>
        </div>
      }


      {bookStatus && <div>
        <div>
          <div className='p-4 sm:p-10 my-10 shadow ropunded' >
            {userBooks.length > 0 ?
              userBooks?.map((book, index) =>
              (

                <div key={index} className='bg-gray-200 p-4 sm:p-8 rounded mt-4' >
                  <div className='grid md:grid-cols-[3fr-1fr] gap-6' >

                    <div className='px-2' >
                      <h1 className='text-xl sm:text-2xl' >  {book?.title}</h1>
                      <h2> {book?.author}</h2>
                      <h3 className='text-blue-600' >₹   {book?.discountPrice}</h3>
                      <p className='text-justify mt-2' >
                          {book?.abstract}     </p>
                      <div className='flex gap-4 mt-5 flex-wrap'   >
                        <img hidden={book?.status == "approve" || book?.status == "sold"} src="https://th.bing.com/th/id/OIP.dw1h6heR3yHTVnVhCwgKGwHaE7?w=298&h=199&c=7&r=0&o=7&pid=1.7&rm=3" alt="" className='w-18 h-14' />
                        <img hidden={book?.status == "pending" || book?.status == "sold"} src="https://tse2.mm.bing.net/th/id/OIP.hZakXkF_XXTSiHh_oHXAXgHaHp?w=600&h=620&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" className='w-14 h-14' />
                        <img hidden={book?.status == "approve" || book?.status == "pending"} src="https://thumbs.dreamstime.com/b/sold-out-logo-badge-sign-108902437.jpg" alt="" className='w-14 h-14' />
                      </div>
                    </div>
                    <div className='px-2 flex flex-col justify-center items-center'  >
                      <img src={book?.imageURL} className='w-52 h-76 object-cover rounded' alt="" />
                      <div className='flex justify-end mt-4' >
                        <button onClick={() => removeBook(book?._id)} type='button' className='p-2 rounded bg-red-600 text-white hover:bg-gray-200  hover:text-red-600 hover:border hover:border-red-600' >
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )
              )
              :
              <div className='flex flexx-col justify-center items-center mt-10' >
              <img src="https://usagif.com/wp-content/uploads/gifs/book-92.gif" alt="" className='w-40 h-40' />
              <p className='text-red-600 text-xl sm:text-2xl' >No Book Added Yet</p>
            </div>
            }


           
          </div>
        </div>
      </div>}
      {purchaseHistory && <div>
        <div>
{purchaseBooks.length > 0 ?
              purchaseBooks?.map((book, index) =>
              (

          <div key={index} className='p-4 sm:p-10 my-10 shadow ropunded' >
            <div className='bg-gray-200 p-4 sm:p-8 rounded mt-4' >
              <div className='grid md:grid-cols-[3fr-1fr] gap-6' >
                <div className='px-2' >
                  <h1 className='text-xl sm:text-2xl' > {book?.title}</h1>
                  <h2>{book?.author}</h2>
                  <h3 className='text-blue-600' >₹   {book?.discountPrice}</h3>
                  <p className='text-justify mt-2' >
                  {book?.abstract}   </p>
                </div>
                <div className='px-2 flex flex-col justify-center items-center'  >
                  <img src={book?.imageURL} className='w-52 h-76 object-cover rounded' alt="" />

                </div>
              </div>
            </div>
         
          </div>

              ))
              :   <div className='flex flexx-col justify-center items-center mt-10' >
              <img src="https://usagif.com/wp-content/uploads/gifs/book-92.gif" alt="" className='w-40 h-40' />
              <p className='text-red-600 text-xl sm:text-2xl' >No Book Purchased Yet</p>
            </div>
            }
        </div>
      </div>
      }
    </ >
  )

}
export default Profile