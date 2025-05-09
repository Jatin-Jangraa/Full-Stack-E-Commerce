import Userdata from "../models/user.models.js";
// import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const signupuser = async (req, res) => {
  const { name, email, passward,gender } = req.body;

  try {
    const existing_user = await Userdata.findOne({email});
   
    if (existing_user)
      return res.status(400).json({ message: "User already exists" });




    const newuser = new Userdata({ name, email, passward ,gender});
const saveduserdata = await newuser.save()

    
    
    res.status(201)
      .json({
      user: saveduserdata
      });
  } catch (error) {
    res.status(500).json({
      error: " error.hello",
    });
  }
};

export const signinuser = async (req, res) => {
  const { email, passward } = req.body;

  const existinguser = await Userdata.findOne({ email });
  if (!existinguser)
    return res.status(400).json({
      message: "User not Exists Please Sign up",
    });

  const ismatch = await bcryptjs.compare(passward, existinguser.passward);

  if (passward === existinguser.passward)
    
    return res.status(220).json({ user:existinguser,message: "Successfully Logined" });

    
  if (!ismatch) return res.status(400).json({ message: "Invalid  Passward" });
};

export const alluser = async (req, res) => {
  

  try {
    const userres = await Userdata.find({});

    return res.status(201).json({
      success: true,
      userres,
    });
  } catch (error) {
    res.json(error);
  }
};

export const userbyid = async (req, res) => {
  try {
    const userid = await Userdata.findOne({ _id: req.params.id });


    res.json({
      userid,
  })
  } catch (error) {
    res.json({
      error
    });
  }
};



export const deleteuser =async(req,res)=>{
    

  try {
    const userid = await Userdata.findOne({ _id: req.params.id });

    await userid.deleteOne()
    res.json({
      message:"User Deleted Successfully"
    });
  } catch (error) {
    res.json({
       message:"User Not Exists"
    });
  }

}