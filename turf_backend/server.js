const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const {connectDB} = require('./config/db')
const userAuthRoutes = require("./routes/userroutes");
const path = require('path');
const fs = require('fs');
dotenv.config();
const app =express();
const PORT =process.env.PORT || 5009;
// Ensure the uploads/turfs directory exists
const dir = path.join(__dirname, 'uploads', 'turfs');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:5173" ,"https://check-turf.vercel.app"],
        methods:["GET","POST","DELETE","PUT","PATCH ","OPTIONS"],
        credentials: true,
      }
));
connectDB();

app.use("/api/auth", userAuthRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// start server
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT} `);
});