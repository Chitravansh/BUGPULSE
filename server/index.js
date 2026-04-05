/** Importing express cors and mongoose and configuration of dotenv */

const express =  require("express");

//connection libraries
const cors  = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

//routes
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comments");
const notificationRoutes = require("./routes/notifications");



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


 // for the notifications
app.use("/api/notifications", notificationRoutes);


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





