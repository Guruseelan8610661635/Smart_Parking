const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
 
app.use(cors());
app.use(express.json());
 
app.get("/", (req,res)=>{
    res.send("Backend running...");
});
 
app.listen(5000, ()=>{
    console.log("Server started on port 5000");
});

const users = [
{email:"test@gmail.com", password:"1234", role:"user"},
{email:"admin@gmail.com", password:"admin", role:"admin"}
];
 
app.post("/login",(req,res)=>{
const {email,password} = req.body;
 
const user = users.find(u=>u.email===email && u.password===password);
 
if(!user){
  return res.json({message:"Invalid credentials"});
}

// Create JWT token
const token = jwt.sign(
    { id: user.email, role: user.role },
    "SECRETKEY",
    { expiresIn: "1h" }
);
 
res.json({message:"Login successful", role:user.role, token});
});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const slotRoutes = require("./routes/slotRoutes");
const projectRoutes = require("./routes/projectRoutes");
 
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/projects", projectRoutes);

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://guruseelan29aug2005_db_user:29aug2005@cluster0.esshsfh.mongodb.net/?appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch(err => console.log("DB Error:", err));


const companyRoutes = require("./routes/companies");
app.use("/api/company", companyRoutes);

require("dotenv").config();

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server running successfully 🚀");
});
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});