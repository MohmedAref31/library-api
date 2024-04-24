import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
import upload from "./storage/upload.js";
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;


app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan(process.env.MODE === "development" ? "dev": "common"));
app.use(bodyParser.json({limit:"10mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"10mb", extended:true}));
app.use(cors());

          

app.post("/upload", upload.single("image"), (req,res)=>{
    console.log(req.file)
    res.send("done")
})



app.listen(port,()=>{
    console.log("app listening on port " + port);
})

