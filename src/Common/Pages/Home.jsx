import React, { useState,useEffect } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { getHomeBookAPI } from '../../service/allAPI';

function Home() {
  const[homeBooks,setHomeBooks]=useState([])
  const getHomeBooks= async ()=>{
    try {
            const result = await getHomeBookAPI( )
            setHomeBooks(result.data)
            console.log(result);           
           
          }
          catch (error) {
            console.log(error)
          }
        }
  
useEffect(() => {
  getHomeBooks()
},[])
  return (
    <>
      <Header />
      {/* landing */}
      <div style={{ height: "500px" }} className='flex flex-col justify-center items-center bg-[url(https://i.pinimg.com/736x/b1/a8/8e/b1a88e6dad76d86cf4c2f6fbedd716a1.jpg)] bg-cover bg-center text-white' >
        <div style={{ height: "500px", backgroundColor: "rgba(0,0,0,0.5" }} className='w-full flex flex-col justift-center items-center' >
          <h1 className='text-5xl font-bold' style={{ marginTop: "50px" }}  > Wounderful Gifts </h1>
          <p>Give your family and friends a book</p>
          <div className='mt-9' >
            <input type="text" placeholder='Search Book' className='bg-white p-2 rounded-3xl placeholder-gray-500 w-100 text-black' />
            <IoSearch className='text-gray-500' style={{ marginLeft: "360", marginTop: "-28px" }} />
          </div>
        </div>
      </div>
      {/* newarrivals */}
      <section className='md:px-40 p-5 my-5 flex flex-col justify-center items-center' >
        <h1 className='text-2xl font-bold' >NEW ARRIVALS

        </h1>
        <p>Explore Our Latest Collection</p>
        <div className='md:grid grid-cols-4 w-full my-10'>
          {
            homeBooks?.map((book,index)=>
            (

          
        <div key={index} className='shadow rounded p-3 mx-4' >
          
          <img width={"100%"} height={"300px"} src=   { book?.imageURL } alt="" />
          <div className='flex flex-col justify-center items-center' >
            <p className='text-blue-700 font-bold text-lg' >
          { book?.title }
            </p>
            <p>   { book?.author }</p>
            <p className='text-red-700 font-bold' >₹   { book?.discountPrice }</p>
          </div>
          
        </div>
          )
            )
        }
        </div>
        <Link to={"/books"} className='bg-blue-800 p-3 text-white font-bold' >Explore More...</Link>
      </section>

      <section className='md:px-40 p-5 my-5 grid grid-cols-4  gap-2 ' >
        <div></div>
        <div className='shadow p-5'>
          <h2 className=' font-bold text-center' > FEATURED AUTHORS</h2>
          <h4>Captivates with every word</h4>
          <p className='justify-center items-center text-justify ' >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nisi ipsum impedit quis distinctio atque, molestiae voluptate blanditiis, eos culpa laboriosam nihil. Esse architecto, atque eius blanditiis eligendi mollitia. Quasi.
            Laudantium molestias voluptatum quasi quo odit. Nobis enim vel, vero sequi aperiam aliquid quam ipsum, quis iste rerum reiciendis repellendus alias totam repellat cum at asperiores adipisci nulla minus. Aspernatur.
          </p>
          <p className='justify-center items-center text-justify ' >
            Amet voluptatibus, enim aliquid sint sit ratione natus mollitia eveniet voluptates magni consequuntur error vero atque quia aperiam, pariatur excepturi id quis voluptatum similique beatae praesentium molestias. Ea, fugiat rem!
            Laudantium molestias voluptatum quasi quo odit. Nobis enim vel, vero sequi aperiam aliquid quam ipsum, quis iste rerum reiciendis repellendus alias totam repellat cum at asperiores adipisci nulla minus. Aspernatur.
          </p>
        </div>
        <div className='shadow  p-5' >
          <img width={"100%"} height={"80px"} src="https://tse4.mm.bing.net/th/id/OIP.vDuXCJYXnbaJHcBo-3l3sQHaLI?pid=ImgDet&w=203&h=304&c=7&o=7&rm=3" alt="" />
        </div>
        <div></div>
      </section>
      <div className='text-center' >  TESTIMONIALS</div>
      <div className='text-center' >   See What Others Are Saying</div>
      <div className=' text-white p-5 grid grid-cols-3 justify-center items-center my-5' >
        <div></div>
        <div className='border mb-5 flex justify-center items-center' >


          <img style={{ width: "200px", height: "100px", borderRadius: "50%" }} src="https://tse4.mm.bing.net/th/id/OIP.vDuXCJYXnbaJHcBo-3l3sQHaLI?pid=ImgDet&w=203&h=304&c=7&o=7&rm=3" alt="" />

        </div>
        <div></div>
      </div>
      <div style={{ marginLeft: "100px", marginRight: "100px" }} className='p-5 items-center  justify-center text-justify mx-5' >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat tempora soluta consequatur omnis doloribus neque minima accusamus ab suscipit eius. Labore, repudiandae vitae! Eveniet pariatur maiores explicabo iure ratione exercitationem.
        Maxime quidem consequuntur temporibus, aspernatur dignissimos, obcaecati explicabo eum odio eveniet pariatur sapiente nisi rem. Ut aspernatur rerum corporis dicta explicabo officia. Aspernatur officia voluptate nisi dolorum molestiae error nobis.
        Sunt minima perferendis placeat iure eius aperiam aliquid, vitae velit necessitatibus maiores quos odio veritatis doloremque ducimus voluptatem dolorem eos exercitationem veniam inventore doloribus itaque fugit dolores! Harum, quod a!
        Quisquam libero quibusdam ipsa ducimus et sint corrupti porro. Voluptate dolorum voluptatibus asperiores! Ipsum molestiae accusantium amet labore assumenda minus quaerat placeat est asperiores. Saepe iusto eveniet eaque quae alias!
      </div>
      <section>

      </section>
      <Footer />
    </>
  )
}

export default Home