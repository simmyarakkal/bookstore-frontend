import React, { createContext, useEffect, useState } from 'react'
export const userAuthContext=createContext("")
function AuthContext({children}) {
const[role,setRole] = useState("")
const[authorisedUser,setAuthorisedUser] = useState(false)


useEffect(()=>
{
    if(sessionStorage.getItem("existingUser") && sessionStorage.getItem("token"))
    {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setRole(user.role)
        console.log('tttttttttt  '+user.role);
        setAuthorisedUser(true)
    }
},[role,authorisedUser])

  return (
   <>
    <userAuthContext.Provider value={{role,authorisedUser,setAuthorisedUser,setRole}}>
        {children}
    </userAuthContext.Provider>
   </>
  )
}

export default AuthContext