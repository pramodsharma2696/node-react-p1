import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import  userRoute from './routes/userRoute.js'
import cors from 'cors'

const app = express();
dotenv.config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;
app.use(cors());
app.use('/api',userRoute);

mongoose.connect(MONGOURL).then(() => {
    console.log("DB Connected !");
    app.listen(PORT, () => {
        console.log(`Server running over: http://localhost:${PORT}/`);

    })

}).catch((err) => console.log("connection error: ", err))