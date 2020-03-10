import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {keys} from "./config/keys";
import cors from "cors";
import tourRoutes from "./routes/tour";
import userRoutes from "./routes/user";
import reviewRoutes from "./routes/review";
import orderRoutes from "./routes/order";
import rangeRoutes from "./routes/range";
import locationRoutes from "./routes/location";
import passport from "passport";
import passportUse from "./middleware/passportUse";


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

app.use(passport.initialize());
passportUse(passport);

app.use('/uploads', express.static('uploads'));

app.use('/api/tour', tourRoutes);
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/range', rangeRoutes);
app.use('/api/location', locationRoutes);

export {app}
