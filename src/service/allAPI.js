import commonAPI from "./commonAPI";
import { serverURL } from "./serverURL";

//register
export const registerAPI=async (reqBody)=>{
return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

//login api
export const loginAPI=async (reqBody)=>
{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

//add book
export const addBookAPI= async (reqBody,reHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-book`,reqBody,reHeader)
}
//home book
export const getHomeBookAPI= async ()=>{
    return await commonAPI("GET",`${serverURL}/home-book` )
}
//all book
export const getAllBookAPI= async ( serachKey)=>{
    return await commonAPI("GET",`${serverURL}/all-book?search=${serachKey}`)
}
//user all book
export const getuserAllBookAPI= async ( reHeader)=>{
    return await commonAPI("GET",`${serverURL}/userall-book` ,"",reHeader)
}
//remove user all book
export const removeBookAPI= async ( id,reHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/remove-book/${id}` ,"",reHeader)
}
//puuchase book
export const getPurchaseBookAPI= async (reHeader)=>{
    return await commonAPI("GET",`${serverURL}/purchase-book`,"",reHeader )
}
//view book
export const getViewBookAPI= async (id,reHeader)=>{
    return await commonAPI("GET",`${serverURL}/view-book/${id}`,"",reHeader )
}

//profile update
export const updateProfileAPI= async (reqBody,reHeader)=>{
    return await commonAPI("PUT",`${serverURL}/update-profile`,reqBody,reHeader )
}
//make payment
export const makePaymentAPI= async (reqBody,reHeader)=>{
    return await commonAPI("POST",`${serverURL}/make-payment`,reqBody,reHeader )
}
/////////////////////////admin////////////////////
//get all book
export const getAllAdminBookAPI= async ( reHeader)=>{
    return await commonAPI("GET",`${serverURL}/admin-book` ,"",reHeader)
}

//approve book
export const approveBookAPI= async ( id,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-updatebook/${id}` ,{},reqHeader)
}

//get all users
export const getAllUsesAPI= async ( reHeader)=>{
    return await commonAPI("GET",`${serverURL}/admin-alluser` ,"",reHeader)
}
//Ademin profile update
export const updateAdminProfileAPI= async (reqBody,reHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-updateprofile`,reqBody,reHeader )
}

//google login

export const googleLoginAPI= async (reqBody,reHeader)=>{
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody,reHeader )
}