import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Mongoo/config/db.js";
import registerRouter from "./routes/users/registerUser.js";
import getUsersRouter from "./routes/users/getUsers.js";
import loginRouter from "./routes/users/loginUser.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Connect Database
connectDB();

// api
app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", getUsersRouter);

//

const PORT = process.env.PORT || 5200;
app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello world " });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running:`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log("JWT SECRET:", process.env.JWT_SECRET);
});
