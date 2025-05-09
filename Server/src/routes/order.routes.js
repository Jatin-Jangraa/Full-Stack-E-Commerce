import express from 'express'
import { allorders, deleteorder, myorders, neworder, processorder, singleorder } from '../controllers/order.controller.js';
import middle from '../middlewares/auth.middlewares.js';


export const orderroute = express.Router();

// http://localhost:4000/order/  


orderroute.post("/new",neworder)


orderroute.get("/my",myorders)


orderroute.get("/all",allorders)



orderroute.get("/singleorder",singleorder)


orderroute.put("/process",processorder)


orderroute.delete("/delete",deleteorder)