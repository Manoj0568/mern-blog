import mongoose from 'mongoose'

const connectToMongoDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_DB_URL).then(()=>console.log("connected to Mongo db successfullly"))
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongoDB;