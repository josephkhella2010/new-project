/* 

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import type { RootState } from "../../Redux/store/store";

import ChatAISection from "./childComponent/ChatAISection";
import InputChat from "./childComponent/InputChat";
import ChatSidebar from "./childComponent/ChatSidebar";

import { setActiveChatId } from "../../Redux/slices/chatSlice/ChatSlice";

export default function ChatMainContainer() {
  // =====================================================
  // LOCAL INPUT STATE
  // =====================================================

  const [inputVal, setInputVal] = useState({
    question: "",
  });

  // =====================================================
  // REDUX
  // =====================================================

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userSlice.user);

  const userId = user?._id;

  const {  chatUser, activeChatId } = useSelector(
    (state: RootState) => state.chatsSlice,
  );

  const chats = chatUser;

  // =====================================================
  // CURRENT CHAT
  // =====================================================

  const currentChat = useMemo(() => {
    if (!chats.length) {
      return null;
    }

    // -----------------------------------------------
    // If activeChatId exists, find that chat
    // -----------------------------------------------

    if (activeChatId) {
      const selectedChat = chats.find(
        (chat) => String(chat._id) === String(activeChatId),
      );

      if (selectedChat) {
        return selectedChat;
      }
    }

    // -----------------------------------------------
    // No active chat
    // Use latest chat
    // -----------------------------------------------

    return chats[chats.length - 1];
  }, [chats, activeChatId]);

  // =====================================================
  // CURRENT CHAT ID
  // =====================================================

  const chatId = currentChat?._id ? String(currentChat._id) : null;

  // =====================================================
  // CURRENT CHAT MESSAGES
  // =====================================================

  const messages = useMemo(() => {
    return currentChat?.messages ?? [];
  }, [currentChat]);

  // =====================================================
  // DEBUG
  // =====================================================

  console.log("=================================");
  console.log("CHAT DEBUG");
  console.log("=================================");

  console.log("USER ID:", userId);
  console.log("CHATS:", chats);
  console.log("ACTIVE CHAT ID:", activeChatId);
  console.log("CURRENT CHAT:", currentChat);
  console.log("CURRENT CHAT ID:", chatId);
  console.log("MESSAGES:", messages);

  // =====================================================
  // LOAD ALL CHATS
  // =====================================================

  useEffect(() => {
    dispatch({
      type: "GET_CHATS_REQUEST",
    });
  }, [dispatch]);

  // =====================================================
  // LOAD LOGGED-IN USER CHATS
  // =====================================================

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch({
      type: "CHAT-USER_REQUEST",
      payload: userId,
    });
  }, [dispatch, userId]);

  // =====================================================
  // SELECT CHAT
  // =====================================================

  const handleSelectChat = (id: string) => {
    console.log("SELECT CHAT:", id);

    dispatch(setActiveChatId(String(id)));
  };

  // =====================================================
  // CREATE NEW CHAT
  // =====================================================

  const handleNewChat = () => {
    if (!userId) {
      console.error("Cannot create chat: userId missing");

      return;
    }

    console.log("=================================");
    console.log("CREATE NEW CHAT");
    console.log("USER ID:", userId);
    console.log("=================================");

    dispatch({
      type: "ADD_CHAT_REQUEST",
      payload: userId,
    });
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const changeInputVal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD MESSAGE
  // =====================================================

  const handleAddMessage = () => {
    const question = inputVal.question.trim();

    // -----------------------------------------------
    // Validate user
    // -----------------------------------------------

    if (!userId) {
      console.error("Cannot send message: userId missing");

      return;
    }

    // -----------------------------------------------
    // Validate chat
    // -----------------------------------------------

    if (!chatId) {
      console.error("Cannot send message: chatId missing");

      return;
    }

    // -----------------------------------------------
    // Validate question
    // -----------------------------------------------

    if (!question) {
      console.error("Cannot send message: question missing");

      return;
    }

    console.log("=================================");
    console.log("ADD MESSAGE");
    console.log("USER ID:", userId);
    console.log("CHAT ID:", chatId);
    console.log("QUESTION:", question);
    console.log("=================================");

    dispatch({
      type: "ADD_MESSAGE_REQUEST",

      payload: {
        userId,
        chatId,
        question,
      },
    });

    // -----------------------------------------------
    // Clear input
    // -----------------------------------------------

    setInputVal({
      question: "",
    });
  };

  // =====================================================
  // DELETE MESSAGE
  // =====================================================

  const handleDelete = (messageId: string) => {
    if (!userId) {
      console.error("Cannot delete message: userId missing");

      return;
    }

    if (!chatId) {
      console.error("Cannot delete message: chatId missing");

      return;
    }

    if (!messageId) {
      console.error("Cannot delete message: messageId missing");

      return;
    }

    console.log("=================================");
    console.log("DELETE MESSAGE");
    console.log("USER ID:", userId);
    console.log("CHAT ID:", chatId);
    console.log("MESSAGE ID:", messageId);
    console.log("=================================");

    dispatch({
      type: "DELETE-MESSAGE_REQUEST",

      payload: {
        userId,
        chatId,
        messageId,
      },
    });
  };
  const handleDeleteChat = (chatId: string) => {
    if (!userId) {
      console.error("Cannot delete chat: userId missing");

      return;
    }

    if (!chatId) {
      console.error("Cannot delete chat: chatId missing");

      return;
    }

    dispatch({
      type: "DELETE-CHAT_REQUEST",

      payload: {
        userId,
        chatId,
      },
    });
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="chat-main-container">
        // ===================================== //
            // HEADER  //
            // ===================================== //


      <div className="chat-header">
        <h2>Chats</h2>

        <button type="button" onClick={handleNewChat}>
          New Chat
        </button>
      </div>
              // ===================================== //
            // CHAT SIDEBAR  //
            // ===================================== //



      <div className="chat-sidebar">
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          setCurrentChat={handleSelectChat}
          handleDeleteChat={handleDeleteChat}
        />
      </div>
                 // ===================================== //
            // CURRENT CHAT //
            // ===================================== //



      <div className="current-chat">
        {currentChat ? (
          <>
            <div className="current-chat-info">
              <p>Chat ID: {String(currentChat._id)}</p>
            </div>

            // ===================================== //
            // MESSAGES //
            // ===================================== //

            <ChatAISection messages={messages} handleDelete={handleDelete} />
          </>
        ) : (
          <div className="no-chat">
            <p>No chat selected.</p>

            <button type="button" onClick={handleNewChat}>
              Create New Chat
            </button>
          </div>
        )}
      </div>

      // ============================================= //
      // INPUT //
      // ============================================= //

      <div className="chat-input">
        <InputChat
          inputVal={inputVal}
          changeInputVal={changeInputVal}
          handleAddMessage={handleAddMessage}
        />
      </div>
    </div>
  );
}
 */

import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import type { RootState } from "../../Redux/store/store";

import ChatAISection from "./childComponent/ChatAISection";
import InputChat from "./childComponent/InputChat";
import ChatSidebar from "./childComponent/ChatSidebar";

import { setActiveChatId } from "../../Redux/slices/chatSlice/ChatSlice";

const useStyles = createUseStyles({
  mainContainer: {
    padding: "70px 20px",
    width: "100%",
    height: "100dvh",
    minHeight: 0,
    display: "grid",
    gridTemplateColumns: "300px minmax(0, 1fr)",
    gridTemplateRows: "70px minmax(0, 1fr) auto",
    boxSizing: "border-box",
    overflow: "hidden",
    color: "#1f2937",

    "@media (max-width: 700px)": {
      gridTemplateColumns: "100px minmax(0, 1fr)",
      padding: "75px 20px",
    },
  },

  chatHeader: {
    gridColumn: "1 / -1",
    gridRow: "1",
    width: "100%",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 25px",
    boxSizing: "border-box",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "hidden",

    "& h2": {
      margin: 0,
      fontSize: "22px",
      color: "#1f2937",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    "& button": {
      flexShrink: 0,
      padding: "9px 18px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.35)",
      backgroundColor: "#1f2937",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",

      "&:hover": {
        backgroundColor: "#111827",
        border: "1px solid #ffffff",
        transform: "translateY(-2px)",
      },
    },

    "@media (max-width: 500px)": {
      padding: "10px 12px",

      "& h2": {
        fontSize: "18px",
      },

      "& button": {
        padding: "7px 12px",
        fontSize: "12px",
      },
    },
  },

  chatSidebar: {
    gridColumn: "1",
    gridRow: "2 / 4",

    width: "100%",
    minWidth: 0,
    minHeight: 0,

    overflow: "hidden",
    boxSizing: "border-box",

    backgroundColor: "#1f2937",
    borderRight: "1px solid #374151",

    "@media (max-width: 700px)": {
      width: "100%",
    },
  },

  currentChat: {
    gridColumn: "2",
    gridRow: "2",

    width: "100%",
    minWidth: 0,
    minHeight: 0,

    display: "flex",
    flexDirection: "column",

    overflow: "hidden",
    boxSizing: "border-box",

    backgroundColor: "#1f2937",
  },

  currentChatInfo: {
    width: "100%",
    minWidth: 0,

    padding: "12px 20px",
    backgroundColor: "#263244",
    borderBottom: "1px solid #374151",
    boxSizing: "border-box",

    "& p": {
      margin: 0,
      color: "#d1d5db",
      fontSize: "13px",

      wordBreak: "break-word",
      overflowWrap: "anywhere",
    },

    "@media (max-width: 500px)": {
      padding: "10px 12px",

      "& p": {
        fontSize: "12px",
      },
    },
  },

  messagesContainer: {
    flex: 1,

    width: "100%",
    minWidth: 0,
    minHeight: 0,

    overflowX: "hidden",
    overflowY: "auto",

    boxSizing: "border-box",
  },

  noChat: {
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    gap: "15px",
    padding: "30px",

    boxSizing: "border-box",
    textAlign: "center",

    overflow: "hidden",

    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",

    "& p": {
      margin: 0,
      color: "#e5e7eb",
      fontSize: "18px",
      maxWidth: "100%",
      overflowWrap: "break-word",
    },

    "& button": {
      flexShrink: 0,

      padding: "10px 20px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.35)",

      backgroundColor: "#1f2937",
      color: "#ffffff",

      fontWeight: 600,
      cursor: "pointer",

      transition: "all 0.2s ease",

      "&:hover": {
        backgroundColor: "#111827",
        border: "1px solid #ffffff",
        transform: "translateY(-2px)",
      },
    },

    "@media (max-width: 500px)": {
      padding: "15px",

      "& p": {
        fontSize: "14px",
      },

      "& button": {
        padding: "8px 14px",
        fontSize: "12px",
      },
    },
  },

  chatInput: {
    gridColumn: "2",
    gridRow: "3",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    backgroundColor: "#1f2937",
    borderTop: "1px solid #374151",
  },
});

export default function ChatMainContainer() {
  const classes = useStyles();

  // =====================================================
  // LOCAL INPUT STATE
  // =====================================================

  const [inputVal, setInputVal] = useState({
    question: "",
  });

  // =====================================================
  // REDUX
  // =====================================================

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userSlice.user);

  const userId = user?._id;

  const { chatUser, activeChatId } = useSelector(
    (state: RootState) => state.chatsSlice,
  );

  const chats = chatUser;

  // =====================================================
  // CURRENT CHAT
  // =====================================================

  const currentChat = useMemo(() => {
    if (!chats.length) {
      return null;
    }

    // -----------------------------------------------
    // If activeChatId exists, find that chat
    // -----------------------------------------------

    if (activeChatId) {
      const selectedChat = chats.find(
        (chat) => String(chat._id) === String(activeChatId),
      );

      if (selectedChat) {
        return selectedChat;
      }
    }

    // -----------------------------------------------
    // No active chat
    // Use latest chat
    // -----------------------------------------------

    return chats[chats.length - 1];
  }, [chats, activeChatId]);

  // =====================================================
  // CURRENT CHAT ID
  // =====================================================

  const chatId = currentChat?._id ? String(currentChat._id) : null;

  // =====================================================
  // CURRENT CHAT MESSAGES
  // =====================================================

  const messages = useMemo(() => {
    return currentChat?.messages ?? [];
  }, [currentChat]);

  // =====================================================
  // DEBUG
  // =====================================================

  console.log("=================================");
  console.log("CHAT DEBUG");
  console.log("=================================");

  console.log("USER ID:", userId);
  console.log("CHATS:", chats);
  console.log("ACTIVE CHAT ID:", activeChatId);
  console.log("CURRENT CHAT:", currentChat);
  console.log("CURRENT CHAT ID:", chatId);
  console.log("MESSAGES:", messages);

  // =====================================================
  // LOAD ALL CHATS
  // =====================================================

  useEffect(() => {
    dispatch({
      type: "GET_CHATS_REQUEST",
    });
  }, [dispatch]);

  // =====================================================
  // LOAD LOGGED-IN USER CHATS
  // =====================================================

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch({
      type: "CHAT-USER_REQUEST",
      payload: userId,
    });
  }, [dispatch, userId]);

  // =====================================================
  // SELECT CHAT
  // =====================================================

  const handleSelectChat = (id: string) => {
    console.log("SELECT CHAT:", id);

    dispatch(setActiveChatId(String(id)));
  };

  // =====================================================
  // CREATE NEW CHAT
  // =====================================================

  const handleNewChat = () => {
    if (!userId) {
      console.error("Cannot create chat: userId missing");

      return;
    }

    console.log("=================================");
    console.log("CREATE NEW CHAT");
    console.log("USER ID:", userId);
    console.log("=================================");

    dispatch({
      type: "ADD_CHAT_REQUEST",
      payload: userId,
    });
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const changeInputVal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD MESSAGE
  // =====================================================

  const handleAddMessage = () => {
    const question = inputVal.question.trim();

    // -----------------------------------------------
    // Validate user
    // -----------------------------------------------

    if (!userId) {
      console.error("Cannot send message: userId missing");

      return;
    }

    // -----------------------------------------------
    // Validate chat
    // -----------------------------------------------

    if (!chatId) {
      console.error("Cannot send message: chatId missing");

      return;
    }

    // -----------------------------------------------
    // Validate question
    // -----------------------------------------------

    if (!question) {
      console.error("Cannot send message: question missing");

      return;
    }

    console.log("=================================");
    console.log("ADD MESSAGE");
    console.log("USER ID:", userId);
    console.log("CHAT ID:", chatId);
    console.log("QUESTION:", question);
    console.log("=================================");

    dispatch({
      type: "ADD_MESSAGE_REQUEST",

      payload: {
        userId,
        chatId,
        question,
      },
    });

    // -----------------------------------------------
    // Clear input
    // -----------------------------------------------

    setInputVal({
      question: "",
    });
  };

  // =====================================================
  // DELETE MESSAGE
  // =====================================================

  const handleDelete = (messageId: string) => {
    if (!userId) {
      console.error("Cannot delete message: userId missing");

      return;
    }

    if (!chatId) {
      console.error("Cannot delete message: chatId missing");

      return;
    }

    if (!messageId) {
      console.error("Cannot delete message: messageId missing");

      return;
    }

    console.log("=================================");
    console.log("DELETE MESSAGE");
    console.log("USER ID:", userId);
    console.log("CHAT ID:", chatId);
    console.log("MESSAGE ID:", messageId);
    console.log("=================================");

    dispatch({
      type: "DELETE-MESSAGE_REQUEST",

      payload: {
        userId,
        chatId,
        messageId,
      },
    });
  };

  const handleDeleteChat = (chatId: string) => {
    if (!userId) {
      console.error("Cannot delete chat: userId missing");

      return;
    }

    if (!chatId) {
      console.error("Cannot delete chat: chatId missing");

      return;
    }

    dispatch({
      type: "DELETE-CHAT_REQUEST",

      payload: {
        userId,
        chatId,
      },
    });
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className={classes.mainContainer}>
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className={classes.chatHeader}>
        <h2>Chats</h2>

        <button type="button" onClick={handleNewChat}>
          New Chat
        </button>
      </div>

      {/* ===================================== */}
      {/* CHAT SIDEBAR */}
      {/* ===================================== */}

      <div className={classes.chatSidebar}>
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          setCurrentChat={handleSelectChat}
          handleDeleteChat={handleDeleteChat}
        />
      </div>

      {/* ===================================== */}
      {/* CURRENT CHAT */}
      {/* ===================================== */}

      <div className={classes.currentChat}>
        {currentChat ? (
          <>
            <div className={classes.currentChatInfo}>
              <p>Chat ID: {String(currentChat._id)}</p>
            </div>

            {/* ===================================== */}
            {/* MESSAGES */}
            {/* ===================================== */}

            <div className={classes.messagesContainer}>
              <ChatAISection messages={messages} handleDelete={handleDelete} />
            </div>
          </>
        ) : (
          <div className={classes.noChat}>
            <p>No chat selected.</p>

            <button type="button" onClick={handleNewChat}>
              Create New Chat
            </button>
          </div>
        )}
      </div>

      {/* ============================================= */}
      {/* INPUT */}
      {/* ============================================= */}

      <div className={classes.chatInput}>
        <InputChat
          inputVal={inputVal}
          changeInputVal={changeInputVal}
          handleAddMessage={handleAddMessage}
          messages={messages}
        />
      </div>
    </div>
  );
}
