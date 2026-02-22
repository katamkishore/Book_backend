import mongoose from 'mongoose';
import dns from 'dns';

// Set DNS servers explicitly to fix querySrv ECONNREFUSED on Windows with Node v22+
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        // Log masked URI for debugging
        const maskedUri = uri.replace(/\/\/(.*):(.*)@/, '//****:****@');
        console.log(`Connecting to MongoDB at cluster: ${maskedUri.split('@')[1].split('/')[0]}`);

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
