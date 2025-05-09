import express from 'express'
import { adminproduct, categoryproduct, deleteproduct, findsingleproduct, latestproduct, newproduct, searchdata, updateproduct } from '../controllers/pdrouct.controller.js';



export const productroute =express.Router();

// invalidate
// http://localhost:4000/product/  
productroute.post("/new",newproduct)

productroute.get("/search",searchdata)

productroute.get("/latest",latestproduct)

productroute.get("/category",categoryproduct)

productroute.get("/allproduct",adminproduct)


productroute.get("/find/:id",findsingleproduct)

// invalidate
productroute.put("/put/:id",updateproduct)

// invalidate
productroute.delete("/delete/:id",deleteproduct)
