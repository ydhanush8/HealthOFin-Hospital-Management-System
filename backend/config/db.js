import mongoose from 'mongoose';

export default async function dataBaseConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{});
        console.log('DataBase connected successfully');
    } catch (error) {
        console.error('Error connecting to DataBase:', error);
    }
};