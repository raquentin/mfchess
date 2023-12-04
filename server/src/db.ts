import mongoose from 'mongoose';

mongoose.set('strictQuery', true); //* requires fields of queries to exist

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECT!);
    console.log("MongoDB connection created");
  } catch (error) {
    console.log(error);
  }
}

const db = {
  connect: connect
};

export default db;
