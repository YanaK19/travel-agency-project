import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {keys} from "./config/keys";
import cors from "cors";
import tourRoutes from "./routes/tour";
import userRoutes from "./routes/user";
import reviewRoutes from "./routes/review";
import orderRoutes from "./routes/review";

const app = express();

mongoose.connect(keys.mongoURI,
    { useNewUrlParser: true,
              useCreateIndex: true,
              useUnifiedTopology: true,
              useFindAndModify: false })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/tour', tourRoutes);
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/order', orderRoutes);

export {app}