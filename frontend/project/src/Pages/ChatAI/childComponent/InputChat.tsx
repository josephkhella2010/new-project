/* 
import type { QuestionInputType } from "../../../utilities/Interfaces";

interface PropsType {
  inputVal: QuestionInputType;

  changeInputVal: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  handleAddMessage: () => void;
}

export default function InputChat({
  inputVal,
  changeInputVal,
  handleAddMessage,
}: PropsType) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleAddMessage();

    console.log("Question:", inputVal.question);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>

        <input
          id="question"
          type="text"
          placeholder="Ask a question..."
          name="question"
          value={inputVal.question}
          onChange={changeInputVal}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
 */

import { createUseStyles } from "react-jss";
import type {
  MessageType,
  QuestionInputType,
} from "../../../utilities/Interfaces";

const useStyles = createUseStyles({
  mainContainer: {
    width: "100%",
    padding: "15px 20px",
    boxSizing: "border-box",
    backgroundColor: "#1f2937",
    borderTop: "1px solid #374151",

    "@media (max-width: 600px)": {
      padding: "12px",
    },
  },

  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxSizing: "border-box",

    "@media (max-width: 600px)": {
      gap: "8px",
    },
  },

  label: {
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    whiteSpace: "nowrap",

    "@media (max-width: 600px)": {
      display: "none",
    },
  },

  input: {
    flex: 1,
    height: "45px",
    boxSizing: "border-box",
    padding: "8px 14px",
    borderRadius: "9px",
    border: "1px solid #6b7280",
    outline: "none",
    backgroundColor: "#f9fafb",
    color: "#1f2937",
    fontSize: "15px",
    transition: "all 0.2s ease",
    "@media (max-width: 700px)": {
      flex: "0 0 60%",
      width: "60%",
      maxWidth: "60%",
    },

    "&:focus": {
      border: "2px solid #43536c",
      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.12)",
    },

    "&::placeholder": {
      color: "#6b7280",
    },
  },

  button: {
    height: "45px",
    minWidth: "90px",
    padding: "8px 18px",
    borderRadius: "9px",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    outline: "none",
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
    transition: "all 0.2s ease",

    "&:hover": {
      border: "1px solid #ffffff",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 18px rgba(0, 0, 0, 0.35)",
    },

    "&:active": {
      transform: "translateY(0)",
    },

    "@media (max-width: 450px)": {
      minWidth: "70px",
      padding: "8px 12px",
    },
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",

    "&:hover": {
      transform: "none",
      border: "1px solid rgba(255, 255, 255, 0.35)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
    },
  },

  notDisabled: {
    opacity: 1,
    cursor: "pointer",
  },
});

interface PropsType {
  inputVal: QuestionInputType;

  changeInputVal: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  handleAddMessage: () => void;
  messages: MessageType[];
}

export default function InputChat({
  inputVal,
  changeInputVal,
  handleAddMessage,
  messages,
}: PropsType) {
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleAddMessage();

    console.log("Question:", inputVal.question);
    console.log("messages", messages);
  };

  return (
    <div className={classes.mainContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor="question">
          Question:
        </label>

        <input
          className={classes.input}
          id="question"
          type="text"
          placeholder="Ask a question..."
          name="question"
          value={inputVal.question}
          onChange={changeInputVal}
        />

        <button
          className={`${classes.button} ${
            inputVal.question.trim() ? classes.notDisabled : classes.disabled
          }`}
          type="submit"
          disabled={!inputVal.question.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
