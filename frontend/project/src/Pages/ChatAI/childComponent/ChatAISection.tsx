/* 

import { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import type { MessageType } from "../../../utilities/Interfaces";

const useStyles = createUseStyles({
  messageContainer: {
    padding: "20px",
    backgroundColor: "green",
    display: "flex",
    gap: "30px",
    width: "100%",
    boxSizing: "border-box",
  },

  messagesContent: {
    padding: "20px",
    height: "300px",
    width: "100%",
    overflowY: "auto",
    backgroundColor: "orangered",

    scrollbarWidth: "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  QuestionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },

  QuestionSection: {
    border: "2px solid black",
    borderRadius: "10px",
    padding: "20px",
    minHeight: "290px",
  },

  lengthSpanSection: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  lengthSpan: {
    width: "30px",
    height: "5px",
    borderRadius: "10px",
    border: "1px solid red",
    cursor: "pointer",
  },

  colored: {
    backgroundColor: "blue",
  },
});

interface PropsType {
  handleDelete: (messageId: string) => void;
  messages: MessageType[];
}

export default function ChatAISection({ handleDelete, messages }: PropsType) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // scroll tracking

  const handleScroll = () => {
    if (isClicked) return;

    const container = messagesContainerRef.current;

    if (!container) return;

    let active = 0;

    questionRefs.current.forEach((element, index) => {
      if (!element) return;

      const elementTop = element.offsetTop - container.offsetTop;

      if (container.scrollTop >= elementTop - 50) {
        active = index;
      }
    });

    setCurrentIndex(active);
  };

  // click span

  const handleSpanClick = (index: number) => {
    const container = messagesContainerRef.current;

    const element = questionRefs.current[index];

    if (!container || !element) return;

    setIsClicked(true);

    element.scrollIntoView({
      behavior: "smooth",

      block: "start",
    });

    setCurrentIndex(index);

    setTimeout(() => {
      setIsClicked(false);
    }, 800);
  };

  // after refresh last question

  useEffect(() => {
    if (!messages.length) return;

    setTimeout(() => {
      const last = messages.length - 1;

      const element = questionRefs.current[last];

      if (element) {
        element.scrollIntoView({
          behavior: "auto",

          block: "start",
        });

        setCurrentIndex(last);
      }
    }, 100);
  }, [messages]);

  return (
    <div>
      <h1>Messages</h1>

      <div className={classes.messageContainer}>
        <div
          className={classes.messagesContent}
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          <div className={classes.QuestionContainer}>
            {messages.map((item, index) => (
              <div
                key={item._id}
                className={classes.QuestionSection}
                ref={(el) => {
                  questionRefs.current[index] = el;
                }}
              >
                <h2>
                  {index + 1} - Question:
                  <span>{item.question}</span>
                </h2>

                <h2>
                  Answer:
                  <span>{item.answer}</span>
                </h2>

                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={classes.lengthSpanSection}>
            {messages.map((_, index) => (
              <div
                key={index}
                className={`
                    ${classes.lengthSpan}
                    ${currentIndex === index ? classes.colored : ""}
                  `}
                onClick={() => handleSpanClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 */

import { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import type { MessageType } from "../../../utilities/Interfaces";

const useStyles = createUseStyles({
  messageContainer: {
    padding: "20px",
    backgroundColor: "#1f2937",
    display: "flex",
    gap: "20px",
    width: "100%",
    boxSizing: "border-box",
    alignItems: "stretch",

    "@media (max-width: 900px)": {
      padding: "15px",
      gap: "15px",
    },

    "@media (max-width: 700px)": {
      padding: "10px",
      gap: "10px",
    },
  },

  messagesContent: {
    padding: "20px",
    height: "345px",
    flex: 1,
    minWidth: 0,
    overflowY: "auto",
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    borderRadius: "15px",
    boxSizing: "border-box",
    scrollbarWidth: "none",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",

    "&::-webkit-scrollbar": {
      display: "none",
    },

    "@media (max-width: 900px)": {
      height: "340px",
      padding: "15px",
    },

    "@media (max-width: 600px)": {
      height: "calc(100dvh - 250px)",
      minHeight: "300px",
      maxHeight: "500px",
      padding: "10px",
      borderRadius: "12px",
    },

    "@media (max-width: 400px)": {
      height: "300px",
      minHeight: "280px",
    },
  },

  QuestionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },

  QuestionSection: {
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "12px",
    padding: "20px",
    minHeight: "290px",
    width: "100%",
    boxSizing: "border-box",

    backgroundColor: "rgba(31, 41, 55, 0.7)",
    color: "#ffffff",

    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    "& h2": {
      margin: "0 0 20px",
      fontSize: "18px",
      lineHeight: 1.5,
      color: "#ffffff",
      fontWeight: 600,

      "& span": {
        display: "block",
        marginTop: "8px",
        color: "#e5e7eb",
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: 1.6,
        wordBreak: "break-word",
        overflowWrap: "anywhere",
      },
    },

    "& button": {
      alignSelf: "flex-start",
      padding: "9px 20px",
      borderRadius: "7px",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      background:
        "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 600,
      boxShadow: "0 5px 12px rgba(0, 0, 0, 0.25)",
      transition: "all 0.2s ease",

      "&:hover": {
        border: "1px solid #ffffff",
        transform: "translateY(-2px)",
        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.35)",
      },

      "&:active": {
        transform: "translateY(0)",
      },
    },

    "@media (max-width: 900px)": {
      minHeight: "280px",
      padding: "18px",

      "& h2": {
        fontSize: "17px",

        "& span": {
          fontSize: "14px",
        },
      },
    },

    "@media (max-width: 600px)": {
      minHeight: "260px",
      padding: "15px",
      borderRadius: "10px",

      "& h2": {
        fontSize: "16px",
        lineHeight: 1.4,
        marginBottom: "15px",

        "& span": {
          fontSize: "14px",
          lineHeight: 1.5,
        },
      },

      "& button": {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
      },
    },

    "@media (max-width: 400px)": {
      minHeight: "240px",
      padding: "12px",

      "& h2": {
        fontSize: "15px",

        "& span": {
          fontSize: "13px",
        },
      },
    },
  },

  lengthSpanSection: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingTop: "5px",

    "@media (max-width: 700px)": {
      width: "100%",
      paddingTop: "0",
      padding: "5px 0",
      scrollbarWidth: "none",
      alignItems: "center",

      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },

  lengthSpan: {
    width: "30px",
    height: "6px",
    flexShrink: 0,
    borderRadius: "10px",
    border: "1px solid #6b7280",
    backgroundColor: "#374151",
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#9ca3af",
      transform: "scaleX(1.15)",
    },

    "@media (max-width: 600px)": {
      width: "25px",
      height: "6px",
    },

    "@media (max-width: 400px)": {
      width: "20px",
      height: "5px",
    },
  },

  colored: {
    backgroundColor: "#ffffff",
    border: "1px solid #ffffff",
    boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
    transform: "scaleX(1.15)",
  },
});

interface PropsType {
  handleDelete: (messageId: string) => void;
  messages: MessageType[];
}

export default function ChatAISection({ handleDelete, messages }: PropsType) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // scroll tracking

  const handleScroll = () => {
    if (isClicked) return;

    const container = messagesContainerRef.current;

    if (!container) return;

    let active = 0;

    questionRefs.current.forEach((element, index) => {
      if (!element) return;

      const elementTop = element.offsetTop - container.offsetTop;

      if (container.scrollTop >= elementTop - 50) {
        active = index;
      }
    });

    setCurrentIndex(active);
  };

  // click span

  const handleSpanClick = (index: number) => {
    const container = messagesContainerRef.current;

    const element = questionRefs.current[index];

    if (!container || !element) return;

    setIsClicked(true);

    element.scrollIntoView({
      behavior: "smooth",

      block: "start",
    });

    setCurrentIndex(index);

    setTimeout(() => {
      setIsClicked(false);
    }, 800);
  };

  // after refresh last question

  useEffect(() => {
    if (!messages.length) return;

    setTimeout(() => {
      const last = messages.length - 1;

      const element = questionRefs.current[last];

      if (element) {
        element.scrollIntoView({
          behavior: "auto",

          block: "start",
        });

        setCurrentIndex(last);
      }
    }, 100);
  }, [messages]);

  return (
    <div className={classes.messageContainer}>
      <div
        className={classes.messagesContent}
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        <div className={classes.QuestionContainer}>
          {messages.map((item, index) => (
            <div
              key={item._id}
              className={classes.QuestionSection}
              ref={(el) => {
                questionRefs.current[index] = el;
              }}
            >
              <h2>
                {index + 1} - Question:
                <span>{item.question}</span>
              </h2>

              <h2>
                Answer:
                <span>{item.answer}</span>
              </h2>

              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className={classes.lengthSpanSection}>
          {messages.map((_, index) => (
            <div
              key={index}
              className={`
                ${classes.lengthSpan}
                ${currentIndex === index ? classes.colored : ""}
              `}
              onClick={() => handleSpanClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
