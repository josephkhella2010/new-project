import "dotenv/config";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Mongoo/config/db.js";
import registerRouter from "./routes/users/registerUser.js";
import getUsersRouter from "./routes/users/getUsers.js";
import loginRouter from "./routes/users/loginUser.js";
import verifyCodeRouter from "./routes/users/getVerificationCode.js";
import deleteUserRouter from "./routes/users/DeleteUser.js";
import updateUserRouter from "./routes/users/updateUser.js";
import getAllChatsAiRouter from "./routes/chatAi/getAllChatAi.js";
import getUserChatsAiRouter from "./routes/chatAi/getUserChats.js";
import addNewChatsAiRouter from "./routes/chatAi/addNewChatToUser.js";
import addMessageToChatsAiRouter from "./routes/chatAi/addMessage.js";
import deleteChatsAiRouter from "./routes/chatAi/deleteChatId.js";
import deleteMessageFromChatAiRouter from "./routes/chatAi/deleteMessageFromChat.js";
//import addMessageToChatAiRouter from "./routes/chatAi/addMessageToChatAi.js";
//import deleteMessageUserAiRouter from "./routes/chatAi/deleteMessageFromUser.js";
//import deleteChatUserAiRouter from "./routes/chatAi/deleteAllChatForUser.js";

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
app.use("/api", verifyCodeRouter);
app.use("/api", deleteUserRouter);
app.use("/api", updateUserRouter);
// chats Ai
app.use("/api", getAllChatsAiRouter);
app.use("/api", getUserChatsAiRouter);
app.use("/api", addNewChatsAiRouter);
app.use("/api", addMessageToChatsAiRouter);
app.use("/api", deleteChatsAiRouter);
app.use("/api", deleteMessageFromChatAiRouter);

//app.use("/api", addMessageToChatAiRouter);
//app.use("/api", deleteMessageUserAiRouter);
//app.use("/api", deleteChatUserAiRouter);

////

const PORT = process.env.PORT || 5200;
app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello world " });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running:`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log("JWT SECRET:", process.env.JWT_SECRET);
});
