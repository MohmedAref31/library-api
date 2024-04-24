import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
import resFormat from "./middlewares/resFormat.js";
import errorHandler from "./middlewares/errorHandler.js";
import appRoutes from "./routes/index.js"
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MODE === "dev"?process.env.LOCAL_DB_URI : process.env.DB_URI;

app.use(resFormat)
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan(process.env.MODE === "development" ? "dev": "common"));
app.use(bodyParser.json({limit:"10mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"10mb", extended:true}));
app.use(cors());

// mount routes // 
app.use('/api/v1',appRoutes)

app.use(errorHandler)

app.listen(port,()=>{
    console.log("app listening on port " + port);
    mongoose.connect(mongoUri)
        .then(()=>console.log("DB connected!!!"))
        .catch(e=>console.log(`DB error: ${e}`))   
}) 

