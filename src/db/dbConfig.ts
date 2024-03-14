import mongoose, { connection } from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        const connection = await mongoose.connection;
        connection.on('connected', ()=>{
            console.log('MongoDB connected successfully')
        })
        connection.on('error', (err)=>{
            console.log('MongoDB connected successfully. please make sure MongoDB is running' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}

