import mongoose from "mongoose";

export const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN as string, {
      autoIndex: true,
    });

    console.log("Base de datos online");
  } catch (error) {
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};
