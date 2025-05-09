import { DisCoupan } from "../models/coupan.model.js";








export const newcoupan = async (req,res)=>{


    const {coupan,amount} =req.body;

    const existingcoupan =await DisCoupan.findOne({coupan:coupan}) 
    
    
    if(existingcoupan) return res.status(404).json({message:"Coupan already Exists"})

    const Coupancode= await DisCoupan.create({ coupan,amount})


   

return res.json(Coupancode)
}




export const getdiscount = async (req,res) =>{

const discount =await DisCoupan.findOne({coupan:req.query.coupan})


if(!discount )  return res.json({message:"Coupan Not Available"})

 res.json(discount)

}


export const allcoupans = async (req,res)=>{


  

    const allcoupan =await DisCoupan.find() 
    
    
    if(!allcoupan) return res.json({message:"Coupans not  Exists"})

   


   

return res.json(allcoupan)
}


export const deletecoupan = async (req,res)=>{


  const deletecoup = await DisCoupan.findByIdAndDelete(req.query.id)

  if(!deletecoup) return res.json({message:"Coupan not Exists"})
  


  res.json({message:"Deleted Successfully"})

}