import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5200;
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "hello world welcome back  i am here" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running:`);
  console.log(`Local:   http://localhost:${PORT}`);
});
