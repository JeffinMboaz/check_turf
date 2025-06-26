// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser")
// const {connectDB} = require('./config/db')
// const userAuthRoutes = require("./routes/userroutes");
// const path = require('path');
// const fs = require('fs');
// dotenv.config();
// const app =express();
// const PORT =process.env.PORT || 5009;
// // Ensure the uploads/turfs directory exists
// const dir = path.join(__dirname, 'uploads', 'turfs');
// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir, { recursive: true });
// }
// app.use(express.json());
// app.use(cookieParser());

// // app.use(cors(
// //     {
// //         origin: ["http://localhost:5173","https://check-turf-f6fw.vercel.app"],
// //         methods:["GET","POST","DELETE","PUT","PATCH ","OPTIONS"],
// //         credentials: true,
// //       }
// // ));
// const allowedOrigins = ["http://localhost:5173", "https://check-turf-f6fw.vercel.app"];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
//   credentials: true,
// }));

// // Explicitly handle preflight
// app.options("*", cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));

// connectDB();

// app.use("/api/auth", userAuthRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // start server
// app.listen(PORT,()=>{
//     console.log(`Server running at http://localhost:${PORT} `);
// });

// editing
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const { connectDB } = require('./config/db');
// const userAuthRoutes = require("./routes/userroutes");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5009;

// app.use(express.json());
// app.use(cookieParser());

// const allowedOrigins = ["http://localhost:5173", "https://check-turf-f6fw.vercel.app"];
// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
//   credentials: true,
// }));
// app.options("*", cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));

// connectDB();
// app.use("/api/auth", userAuthRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

adding const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const userAuthRoutes = require("./routes/userroutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5009;

const allowedOrigins = [
  "http://localhost:5173",
  "https://check-turf-f6fw.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", userAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
