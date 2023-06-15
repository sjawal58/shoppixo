import axios from "axios"

const URL = "http://localhost:5000"

export const addUsers = async(data) => {
    try{
        return await axios.post(`${URL}/adduser`, data)
    }catch(error){
        console.log(error)
    }
}