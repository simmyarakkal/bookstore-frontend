import React, { useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { CiLocationOn } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh"
};
function AdminCareers() {
  const [jobListStaus, setJobListStaus] = useState(true)
  const [viewListStaus, setViewListStaus] = useState(false)
   const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true);
     
  }
  const handleClose = () => setOpen(false);
  return (
    <> <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2' >
        <div className='col-span-1' >
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10' >
          <h1 className='text-3xl text-center font-bold' >
            Career Management
          </h1>
          <div className='flex justify-center items-center my-8 font-mediumtext-lg'>
            <p onClick={() => { setJobListStaus(true), setViewListStaus(false) }} className={jobListStaus ? 'text-blue-500 p-4 border-gray-200 border-t border-1 border-r rounded cursor-pointer'
              :
              'p-4 border-gray-200 border-b b cursor-pointer'
            }  >
              Job Post
            </p>
            <p onClick={() => { setViewListStaus(true), setJobListStaus(false) }} className={viewListStaus ? 'text-blue-500 p-4 border-gray-200 border-t border-1 border-r rounded cursor-pointer'
              :
              'p-4 border-gray-200 border-b b cursor-pointer'
            }  >
              View Applicants
            </p>
          </div>
          {jobListStaus && <div>
            <div className='flex  flex-col my-5' >
              <div className='flex  flex-col my-5' >
                <div className='flex my-5 justify-between gap-2' >
                  <input type="text" placeholder='Search by Title' className='p-2 border border-gray-200 text-black w-100 placeholder-gray-600 ' />
                  <button className='bg-green-900 text-white p-2 rounded rounded-sm' >Search</button>
                  <div className="flex ">
                    <button onClick={handleOpen} className='bg-blue-900 w-20 text-white p-2 rounded items-center flex  gap-2 rounded-sm' >Add<IoMdAdd /></button>
                   
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Careers
          </Typography>

          <div>
            <div>  
              
              <div className='flex row p-3 gap-2' >
                <TextField id="standard-basic" label="Job Title"  variant="standard" />
                  </div>
            </div>
            
            <div className='flex justify-content-end gap-3' >
              <button className='bg-blue-900 w-20 text-white p-2 rounded items-center flex  gap-2 rounded-sm'  cd frontent> Reset</button>
              <button className='bg-blue-900 w-20 text-white p-2 rounded items-center flex  gap-2 rounded-sm' type='button'  > Add</button>
            </div>
          </div>
        </Box>
      </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className='  my-5 items-start border-gray-200 border-2   rounded-sm'  >

              <div className='col-span-2 flex flex-col ' >
                <div className='flex justify-between my-5 ' >
                  <h1 className='p-5 text-3xl ' >Frontend Developer</h1>
                  <button className='w-25 bg-red-900 text-white m-2 p-2 flex items-center gap-2 rounded rounded-sm' >Delete <RiDeleteBin6Line />  </button>
                </div>
                <div className='pl-5 flex gap-2' >
                  <CiLocationOn />
                  <h5 className='text-xs' >Kochi</h5>
                </div>

                <div className=' p-5 text-base ' >
                  <div className='flex gap-3 ' >
                    <p className='font-semibold'>Job Type</p>:<p className='text-sm mt-1 font-thin' >Full Time</p>
                  </div>
                  <div className='flex gap-3 ' >
                    <p className='font-semibold'> Salary</p>:<p className='text-sm mt-1 font-thin' >20000-30000/month</p>
                  </div>
                  <div className='flex gap-3 ' >
                    <p className='font-semibold'>Qualification</p>:<p className='text-sm mt-1 font-thin' >MCA</p>
                  </div>
                  <div className='flex gap-3 ' >
                    <p className='font-semibold'>Experience</p>:<p className='text-sm mt-1 font-thin' >1-2 years</p>
                  </div>
                  <div className='flex gap-3 ' >
                    <p className=''>Description</p>:<p className='text-sm mt-1 font-thin' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, earum officia? Dolore quo sit suscipit. Rerum et inventore aut optio. Eos tempora dolorum odio quasi voluptatem voluptatum est recusandae voluptatibus.</p>
                  </div>


                </div>
              </div>

            </div>
            <p className='text-red-600 text-center items-center' >No job openings...</p>
          </div>}
          {viewListStaus && <div>
           <table className="w-full border border-gray-300 border-collapse">
  <thead>
    <tr className="bg-blue-900 text-white">
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        SL.No
      </th>
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Job Title
      </th>
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Name
      </th>
      <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
        Qualification
      </th>
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Email
      </th>
      <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
        Phone
      </th>
      
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
        Cover Letter
      </th>
      <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
        Resume
      </th>

    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="border border-gray-300 px-4 py-2">1</td>
      <td className="border border-gray-300 px-4 py-2">Sofware Tester</td>
      <td className="border border-gray-300 px-4 py-2">Sijo</td>
      <td className="border border-gray-300 px-4 py-2">BCA</td>
      <td className="border border-gray-300 px-4 py-2">sijo@test.com</td>
      <td className="border border-gray-300 px-4 py-2">9880098765</td>
      <td className="border border-gray-300 px-4 py-2 text-sm ">Lorem ipsum dolor sit amet consectetur adipisicing elit. ectetur quod est cumque rem laboriosam saepe? Doloribus cupiditate ut eligendi rerum exercitationem, totam minima ipsa natus fugiat!</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <a className="px-3 py-1 underline  text-blue-800 text-sm">
          Resume
        </a>
      </td>
    </tr>
  </tbody>
</table>
          </div>}

        </div>

      </div>
    </>
  )
}

export default AdminCareers