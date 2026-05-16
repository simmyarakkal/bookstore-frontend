import React, { createContext, useState } from 'react'

export const userUpdateContext=createContext("")
export const adminUpdateContext=createContext("")
function ContextShare({children}) {
    const [userEditResponse,setuserEditResponse] =useState({})
const [adminEditResponse,setAdminEditResponse] =useState({})
  return (
    <>
    <userUpdateContext.Provider value={{userEditResponse,setuserEditResponse}}>
        <adminUpdateContext.Provider value={{adminEditResponse,setAdminEditResponse}}>
    {children}
    </adminUpdateContext.Provider>
    </userUpdateContext.Provider>
        
    </>
  )
}
// export const userUpdateContext=createContext("")
// function ContextShare({children}) {
//     const [userEditResponse,setuserEditResponse] =useState({})
// const [adminEditResponse,setAdminEditResponse] =useState({})
//   return (
//     <>
//     <userUpdateContext.Provider value={{userEditResponse,setuserEditResponse}}>
//     {children}
//     </userUpdateContext.Provider>
//        <adminEditResponse.Provider value={{adminEditResponse,setAdminEditResponse}}>
//     {children}
//     </adminEditResponse.Provider>
//     </>
//   )
// }
export default ContextShare