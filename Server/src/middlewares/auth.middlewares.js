import Userdata from "../models/user.models.js";


const middle =async(req,res,next)=>{

    try {
        
        
        
        const user =await Userdata.findOne({_id:req.query.id})

if(!user) return res.json ({message:"Phele Login kr"})

        let userrole = user.role



        if(!userrole) return res.json({message:"Are are only a user"})
if(userrole==="user") return res.json({message:"Tu user h admin nhi"})

            if(userrole==="admin") next()

    } catch (error) {
        res.json(error)
    }




}



export default middle;