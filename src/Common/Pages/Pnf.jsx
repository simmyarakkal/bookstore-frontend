import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
 
function Pnf() {
  return (
    <>
         <Header/>
        <div style={{ Width: "100%",height:"50%" }}>
             {/* <img style={{margin:"auto",width:"50%",display:"block",boxShadow:"5px",height:"600px"}}
                src="src/images/pfn.png" 
                
                alt="img"
                loading="lazy"
              /> */}
            <img style={{margin:"auto",width:"50%",display:"block",boxShadow:"5px",height:"600px"}}
                src="https://media.istockphoto.com/vectors/error-page-not-found-miss-paper-with-white-background-design-template-vector-id963575966?k=20&m=963575966&s=612x612&w=0&h=O10w3pcS5Cs_Pyppg1fg7uc6vgO8r1EVll0XAo3ajqs=" 
                
                alt="img"
                loading="lazy"
              />
        </div> 
        <Footer/>
        </>
  )
}

export default Pnf