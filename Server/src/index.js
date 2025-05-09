import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import { userroutes } from "./routes/user.routes.js";
import cors from "cors";
import { productroute } from "./routes/product.routes.js";
import NodeCache from "node-cache";
import { orderroute } from "./routes/order.routes.js";
import morgan from "morgan";
import { paymentroute } from "./routes/payment.routes.js";
import { dashroute } from "./routes/dash.route.js";
dotenv.config();
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname= path.dirname(__filename)

const app = express();

connectdb();



app.use(express.json());
app.use(morgan("dev"));

export const mycache = new NodeCache();


app.use(express.static(path.join(__dirname,'../../Client/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"../../Client/dist",'index.html'))
})

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/user", userroutes);

app.use("/product", productroute);

app.use("/order", orderroute);

app.use("/payment", paymentroute);

app.use ("/dashboard",dashroute)

app.listen(process.env.PORT||4000, () => {
  console.log(`Express is running on Port ${process.env.PORT}`);
});
