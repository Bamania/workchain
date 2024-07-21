import express from 'express';
import mongoDb from "../server/model_database/index.js"
import  jobform from "./api/jobfrom.js"
import cors from "cors"
const PORT = process.env.PORT || 5000;
// essentialls
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
);

// route
app.use(cors());
app.use('/api', jobform)

mongoDb();


// start the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});