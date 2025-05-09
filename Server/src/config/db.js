import mongoose from 'mongoose'



const connectdb =async()=>{
    try {
        mongoose.connect(process.env.mongo_url,{dbName:"E-Commerce"})

        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}

export default connectdb;