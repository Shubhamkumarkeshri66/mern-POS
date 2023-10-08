const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
require("colors");
const connectDb = require("./config/config");

const path =require('path')


//dotenv config
dotanv.config();
//db config
connectDb();

//rest objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan("dev"));


//static fill access
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoute"));


app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`.bgCyan.white);
});
