import mongoose from 'mongoose';
var password = encodeURIComponent("#LRQRUGGL");
const mongooseURL = `mongodb+srv://BLOCKFIVER:${password}@cluster0.nkkmq94.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/blockchainJob`;   //blockchainJob is the database name 

const mongoDB = async () => {
  try {
    await mongoose.connect(mongooseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default mongoDB
