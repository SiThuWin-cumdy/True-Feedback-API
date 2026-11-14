import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast (5s) instead of waiting 30s
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('--- Connection Error Detail ---');
    console.error('Code:', err.code);
    console.error('Reason:', err.reason ? JSON.stringify(err.reason, null, 2) : err.message);
    process.exit(1);
  }
};

export default connectDB;
