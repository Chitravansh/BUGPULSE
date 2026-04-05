/** Importing express cors and mongoose and configuration of dotenv */

const express =  require("express");
const cors  = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comments");
const { Server } = require("socket.io");


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



//Use Authentication 

app.use("/api/auth", authRoutes);


 //Uploads cann take place
 app.use("/uploads", express.static("uploads"));
 
 //for the comments 
 app.use("/api/comments", commentRoutes);


//app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

const server = app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io; // 🔥 IMPORTANT





