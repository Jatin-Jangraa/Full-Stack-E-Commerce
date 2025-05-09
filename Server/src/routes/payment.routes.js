import express from 'express'
import middle from '../middlewares/auth.middlewares.js';
import { allcoupans, deletecoupan, getdiscount, newcoupan } from '../controllers/payment.controller.js';


export const paymentroute=express.Router();


    paymentroute.post('/coupan/new',newcoupan);

    paymentroute.get('/discount',getdiscount);

    paymentroute.get("/coupan/all",allcoupans)

  paymentroute.delete("/coupan/delete",deletecoupan)