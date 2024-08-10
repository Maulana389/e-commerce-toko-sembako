import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,
      {useNewUrlParser: true,
      useUnifiedTopology: true}
    );
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;