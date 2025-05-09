import { mycache } from "../index.js";
import { Order } from "../models/orders.model.js";
import { invalidateCache, reducestock } from "../utils/features.js";

export const neworder = async (req, res) => {

    const { shippinginfo, user, name,subtotal, tax, shippingcharges, discount, total ,orderitems} = req.body;


    await Order.create({shippinginfo, user,name, subtotal, tax, shippingcharges, discount, total ,orderitems})


    await reducestock(orderitems)

    invalidateCache()

    res.json({
        message:"Successfully Ordered"
    })
}



export const myorders = async (req,res) =>{

    // const{id}=req.query.id;

    let orders = [];

    // const  key = `my-orders-${id}`
 
    // if(mycache.has(key) )  orders = JSON.parse(mycache.get(req.query.id))

        // else{
           const order =await Order.find({user:req.query.id})
            // mycache.set(key,JSON.stringify(orders))
        // }
    order.forEach((item)=>orders.push(item))

        return res.json(orders)
} 


export const allorders = async (req,res)=>{

const key = `allorders`


let allorders =[];


// if(mycache.has(key) )  allorders = JSON.parse(mycache.get(key))

    // else{
       allorders =await Order.find().populate()
    //     mycache.set(key,JSON.stringify(allorders))
    // }

    res.json(allorders)
}







export const singleorder = async (req,res) =>{

    const{id}=req.query.id;

    let order=[] ;

    // let key = `single-order-${id}`
 
    // if(mycache.has(key) )  order = JSON.parse(mycache.get(key))

    //     else{
            order =await Order.findById(req.query.id)

            // mycache.set(key,JSON.stringify(order))
        // }


        return res.json(order)
} 



export const processorder = async (req,res) =>{
     

  

    let order = await Order.findById(req.query.id)

    switch (order.status) {
        case "Processing":
            order.status="Shipped"
            break;
        case "Shipped":
            order.status="Delivered"
        default:
              order.status="Delivered"
            break;
    }



    await order.save()

    invalidateCache()


    res.json({message:"Updated Successfully"})
}



export const deleteorder = async (req,res) =>{
     

    

    const order = await Order.findById(req.query.id)

    


    await order.deleteOne()

    invalidateCache()


    res.json({message:"Deleted Successfullt"})
}