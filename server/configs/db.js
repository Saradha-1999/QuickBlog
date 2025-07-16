import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // ✅ Log the Mongo URI (debugging)
    console.log("Using URI:", process.env.MONGODB_URI);

    // ✅ Connect
    await mongoose.connect(process.env.MONGODB_URI);

    // ✅ Success log
    mongoose.connection.on('connected', () =>
      console.log("Database connected successfully")
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;






// import mongoose from "mongoose";

// const connectDB = async () => {
// try {
//     mongoose.connection.on('connected', ()=>console.log("Database connected successfully")
// )
//     await mongoose.connect(`${process.env.MONGODB_URI}/QuickBlog`)
// } catch (error) {
//     console.log(error.message);
// }

// }

// export default connectDB;