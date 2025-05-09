import axios from 'axios'



export const signapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/user/`
})

export const productapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/product/`
})

export const usersapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/user/`
})


export const transactionapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/order/`
})


export const paymentapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/payment/`
})


export const statapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/dashboard/`
})