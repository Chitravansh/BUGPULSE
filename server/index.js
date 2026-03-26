/** Importing express cors and mongoose and configuration of dotenv */

const express =  require("express");
const cors  = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

/** calling express in app variable */

const app = express();

const PORT = process.env.PORT;

/** making use of cors */
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB connected"));

 app.use("/api/bugs", require("./routes/bugs"));

 app.get("/test", (req, res) => {
  res.send("Backend working");
});
 
 //Uploads cann take place
 app.use("/uploads", express.static("uploads"));
 


app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));





