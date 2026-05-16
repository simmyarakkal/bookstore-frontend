import React, { useEffect, useState } from 'react'
import Header from '../../Common/Components/Header'
import Footer from '../../Common/Components/Footer'
import { Link } from 'react-router-dom'
import { getAllBookAPI } from '../../service/allAPI'

function Books() {
  const [token, setToken] = useState("")
    const[allBooks,setAllBooks]=useState([])
    const[temBooks,setTemBooks]=useState([])
    const[allCategories,setAllCategories]=useState([])
  const[serachKey,setSearchKey] =useState("")
  const getAllbooks = async () => {
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }


      console.log('reqHeader');
      try {
        const result = await getAllBookAPI(serachKey)
         setAllBooks(result.data)
         setTemBooks(result.data)
         const temArray=result.data.map(item=> item.category)
         console.log(temArray);
         const  tempCategory=[...new Set(temArray)]
         setAllCategories(tempCategory)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const filterBooks=(category)=>
  {
    console.log('aaaaabbbb'+category);
    if(category == "No Filter")
    {
      setAllBooks(temBooks)
    }
    else{
      setAllBooks(temBooks?.filter(item=>item.category == category))
    }
  }
 
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    getAllbooks()
  }, [token,serachKey])

  return (
    <>
      <Header />
      <div className='flex justify-center items-center flex-col my-5' >
        <h1 className='text-3xl font-bold my-5' >Collections</h1>
        <div className='flex my-5 gap-2' >
          <input type="text" value={serachKey} onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search by Title' className='p-2 border border-gray-200 text-black w-200 placeholder-gray-600 ' />
          <button className='bg-blue-900 text-white p-2 rounded rounded-2' >Search</button>
        </div>
      </div>
      {/* grid */}
      <div className='md:grid grid-cols-4 md:px:20 p-5 mb-10' >
        <div className='col-span-1 shadow p-4 rouded rounded-3' >
          <h1 className='text-2xl font-bold' >
            Filter
          </h1>
          {/* <div className='mt-5' >
            <div className='mt-3' >
              <input type="radio" id='category' />
              <label htmlFor="category">Romance</label>
            </div>
          </div> */}
   <div className='mt-5'>
  {
    allCategories?.map((item, index) => (
      <div key={index} className='mt-3'>
        <input 
          type="radio"
          name="category"
          id={item}
          value={item}
          onChange={(e) => filterBooks(e.target.value)}
        />
        <label htmlFor={item}>{item}</label>
      </div>
    ))
  }

  <div className='mt-3'>
    <input 
      type="radio"
      name="category"
      id="no-category"
      value="No Filter"
      onChange={(e) => filterBooks(e.target.value)}
    />
    <label htmlFor="no-category">No Filter</label>
  </div>
</div>
        </div>
        <div className='col-span-3' >
          <div className='md:grid grid-cols-4 mt-5 md:mt-0' >
             {
                  allBooks?.length>0 ?
            allBooks?.map((book,index)=>
            (

            <div key={index }className='shadow rounded p-3 mx-4' >
              <img width={"100%"} height={"300px"} src={ book?.imageURL } alt="" />
              <div className='flex flex-col justify-center items-center' >
                <p className='text-blue-700 font-bold text-lg' >
                  { book?.title }
                </p>
                     <p>   { book?.author }</p>
                <p className='text-red-700 font-bold' >₹ { book?.discountPrice }</p>
                <div className='flex justify-center items-center mt-3' >
                  <Link to={`/view-book/${book?._id}/book`}className='bg-blue-800 p-2 text-center text-white w-75' >View Books</Link>
                </div>
              </div>
            </div>
             ))
             :
            <h1>No data</h1>
}
          </div>
        </div>
      </div>
      < Footer />
    </>
  )
}

export default Books