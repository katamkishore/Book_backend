import mongoose from 'mongoose';

const uri = "mongodb+srv://kishore18:kishore12@cluster0.5hb9zp0.mongodb.net/";

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err.message);
    process.exit(1);
  });
