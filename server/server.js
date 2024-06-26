const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
const userRoutes = require("./routes/userRouter.js")

dotenv.config();
const app = express();

app.use(express.json())
// app.use(cors())
app.use(cors({
    // origin: "https://ecommerce-mern-n5ro.vercel.app",
    origin: "https://ecommerce-mern-1-yi5n.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], 
    exposedHeaders: ["Content-Length", "Authorization"], 
}));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/", routes)
app.use("/auth", userRoutes)

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true 
}).then(()=>{
    console.log("MongoDB connected successfully")
}).catch((err)=>{
    console.log(err)
})


const PORT = process.env.PORT || 9000

app.listen(PORT, ()=>{
    console.log(`Sever listening on ${PORT}`)
})
