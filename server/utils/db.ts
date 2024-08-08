import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl:string = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`Database Connected with ${data.connection.host}`)
        })
    }catch(err:any) {
        console.log(err.message);
        console.log("Retrying...");
        setTimeout(connectDB, 5000);

    }
}

export default connectDB;