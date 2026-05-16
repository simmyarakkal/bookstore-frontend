import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
function Contact() {
 
  return (
    <>
  <Header/>
  <section>
    <div  className='text-center' >  Contact Us</div>
     <div style={{marginLeft:"100px",marginRight:"100px"}}   className='p-5 items-center  justify-center text-center mx-5' >
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat tempora soluta consequatur omnis doloribus neque minima accusamus ab suscipit eius. Labore, repudiandae vitae! Eveniet pariatur maiores explicabo iure ratione exercitationem.
      Maxime quidem consequuntur temporibus, aspernatur dignissimos,     </div>
      <div  className='grid grid-cols-[15%_70%_15%] gap-4 justify-center items-center p-5  ' >
 <div  ></div>
<div   className='grid grid-cols-3 justify-center items-center p-5' >
    <div style={{width:"250px" }} className="flex items-center gap-2 shadow rounded">
  <IoLocationOutline />
  <h5>Kochi, Kerala</h5>
</div>
  <div style={{width:"250px" }} className="flex items-center gap-2 shadow rounded">
  <MdOutlinePhone />
  <h5>+91 9886654566</h5>
</div>
  <div style={{width:"250px" }} className="flex items-center   gap-2 shadow rounded">
<MdOutlineMail />
 <h5>bookstore@gmail.com</h5> 
</div>
</div>
    <div></div>
    </div>
    <div  className='grid grid-cols-[15%_70%_15%] gap-4 justify-center items-center p-5  ' >
 <div  ></div>
   <section className=' p-5 my-5 grid grid-cols-2  gap-2 ' >
 
  <div>
        <div className='shadow p-5'>
         <form class="max-w-md mx-auto">
         
            <div className='text-center' >  <h1>Contact Us</h1></div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="email" name="floating_email" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="password" name="floating_password" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="address" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
    <textarea  rows="5"  name="repeat_password" id="msg" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ></textarea>
      
      <label for="msg"  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Message</label>
  </div>
   

  <button style={{width:"90%"}} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Message--></button>
</form>
 </div>
        </div>
        <div className='shadow  p-5' >
         <iframe
  title="Google Map"
  src="https://www.google.com/maps?q=New+York&output=embed"
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/></div>
      
      </section>
       <div  ></div>
       </div>
  </section>
  <Footer/>
    </>

  )
}

export default Contact