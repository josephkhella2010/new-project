/* import type { ChatType } from "../../../utilities/Interfaces";

interface Props {
  chats: ChatType[];

  activeChatId: string | null;

  setCurrentChat: (id: string) => void;
  handleDeleteChat: (chatId: string) => void;
}

export default function ChatSidebar({
  chats,
  activeChatId,
  setCurrentChat,
  handleDeleteChat,
}: Props) {
  const chatsWithMessages = chats.filter(
    (chat) => chat.messages && chat.messages.length > 0,
  );

  return (
    <div
      style={{
        width: "300px",
        borderRight: "1px solid black",
        padding: "10px",
      }}
    >
      <h3>Chats</h3>

      {chatsWithMessages.map((chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1];

        return (
          <div
            key={chat._id}
            onClick={() => setCurrentChat(chat._id)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "15px",
              padding: "10px",
              background: activeChatId === chat._id ? "lightblue" : "white",
            }}
          >
            <div>
              <button onClick={() => handleDeleteChat(String(chat._id))}>
                {" "}
                delete
              </button>
              <strong>Q:</strong> {lastMessage.question.slice(0, 30)}
              <br />
              <strong>A:</strong> {lastMessage.answer.slice(0, 30)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
 */

import { createUseStyles } from "react-jss";
import type { ChatType } from "../../../utilities/Interfaces";

const useStyles = createUseStyles({
  sidebar: {
    width: "300px",
    minWidth: "300px",
    height: "100%",
    minHeight: "400px",
    padding: "15px",
    boxSizing: "border-box",
    backgroundColor: "#1f2937",
    borderRight: "1px solid #374151",
    overflowY: "auto",

    scrollbarWidth: "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },

    "@media (max-width: 700px)": {
      width: "100px",
      minWidth: "100px",
      padding: "10px",
    },
  },

  title: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 600,
    margin: "0 0 20px",
    paddingBottom: "12px",
    borderBottom: "1px solid #4b5563",
  },

  chatItem: {
    display: "block",
    width: "100%",
    marginBottom: "12px",
    padding: "12px",
    boxSizing: "border-box",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 5px 12px rgba(0, 0, 0, 0.2)",

    "&:hover": {
      transform: "translateY(-2px)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 8px 18px rgba(0, 0, 0, 0.3)",
    },
  },

  activeChat: {
    background:
      "linear-gradient(135deg, #5b6b85 0%, #41648f 45%, #344d83 100%)",
    border: "1px solid #ffffff",
    boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
  },

  chatContent: {
    fontSize: "14px",
    lineHeight: 1.6,
    wordBreak: "break-word",

    "& strong": {
      color: "#ffffff",
      fontWeight: 700,
    },
  },

  messageText: {
    color: "#e5e7eb",
  },

  deleteButton: {
    float: "right",
    marginLeft: "8px",
    marginBottom: "5px",
    padding: "5px 9px",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#111827",
      border: "1px solid #ffffff",
      transform: "translateY(-1px)",
    },
  },
});

interface Props {
  chats: ChatType[];

  activeChatId: string | null;

  setCurrentChat: (id: string) => void;
  handleDeleteChat: (chatId: string) => void;
}

export default function ChatSidebar({
  chats,
  activeChatId,
  setCurrentChat,
  handleDeleteChat,
}: Props) {
  const classes = useStyles();

  const chatsWithMessages = chats.filter(
    (chat) => chat.messages && chat.messages.length > 0,
  );

  return (
    <div className={classes.sidebar}>
      <h2 className={classes.title}>Chats</h2>

      {chatsWithMessages.map((chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1];

        return (
          <div
            key={chat._id}
            onClick={() => setCurrentChat(chat._id)}
            className={`${classes.chatItem} ${
              activeChatId === chat._id ? classes.activeChat : ""
            }`}
          >
            <div className={classes.chatContent}>
              <button
                className={classes.deleteButton}
                onClick={() => handleDeleteChat(String(chat._id))}
              >
                delete
              </button>
              <strong>Q:</strong>{" "}
              <span className={classes.messageText}>
                {lastMessage.question.slice(0, 30)}
              </span>
              <br />
              <strong>A:</strong>{" "}
              <span className={classes.messageText}>
                {lastMessage.answer.slice(0, 30)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
