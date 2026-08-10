/* import { createUseStyles } from "react-jss";
import { loginInputs } from "../../../utilities/Arrays";
import type { LoginInputsValType } from "../../../utilities/Interfaces";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store/store";
import { setShowEmailSection } from "../../../Redux/slices/Common/showEmailSection";

const useStyles = createUseStyles({
  learningSection: {
    display: "flex",
    alignItems: "center",
    gap: 50,
    marginTop: 90,
    marginBottom: 90,
    position: "relative",
    "@media (max-width:900px)": {
      flexDirection: "column-reverse",
    },

    "& img": {
      width: "100%",
      maxWidth: 500,
      borderRadius: 18,
      boxShadow: "0 15px 35px rgba(0, 0, 0, .08)",
      height: "500px",
      "@media (max-width:750px)": {
        width: "100%",
        maxWidth: "100%",
      },
    },
  },
  formContainer: {
    backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    alignItems: "center",
    padding: "30px",
  },

  formMainSection: {
    background:
      "linear-gradient(135deg,#2466e4 0%, #172554 40%, #2563EB 70%, #06B6D4 100%)",
    //width: "fit-content",
    padding: "30px",
    borderRadius: "20px",
    width: "50%",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.36)",

    "@media (max-width: 800px)": {
      width: "90%",
    },
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formLabel: {
    display: "flex",
    //backgroundColor: "yellow",
    gap: "30px",
    justifyContent: "space-between",
    alignItems: "center",
    "& p": {
      margin: "0px",
      fontSize: "15px",
      color: "white",
      "@media (max-width: 700px)": {
        fontSize: "10px",
      },
    },
  },
  inputContainer: {
    backgroundColor: "blue",
    width: "70%",
    "@media (max-width: 700px)": {
      width: "60%",
    },

    "& input": {
      margin: "0px",
      width: "100%",
      height: "30px",
      borderRadius: "5px",
      border: "0.5px solid black",
      outline: "none",
      padding: "5px",
    },
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& button": {
      background:
        "linear-gradient(135deg, #2466e4 0%, #0a298e 40%, #3c63b9 70%, #2466e4 100%)",
      margin: "0px",
      width: "50%",
      height: "50px",
      borderRadius: "10px",
      border: "0.5px solid black",
      outline: "none",
      padding: "5px",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.36)",

      "&:hover": {
        border: "1px solid white",
      },
    },
  },
});

interface PropsType {
  loginValue: LoginInputsValType;
  setLoginValue: Dispatch<SetStateAction<LoginInputsValType>>;
}
export default function LoginFirstSection({
  loginValue,
  setLoginValue,
}: PropsType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state: RootState) => state.loadingSlice);
  //////// function /////

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string,
  ) => {
    const { value } = e.target;

    setLoginValue((prev) => ({ ...prev, [val]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(" registerValue", loginValue);
    dispatch({ type: "LOGIN_USERS_REQUEST", payload: loginValue });
  };
  useEffect(() => {
    if (isSuccess) {
      setLoginValue({
        username: "",
        password: "",
      });
    }
  }, [isSuccess, setLoginValue]);

  ///////////
  return (
    <div className={classes.formContainer}>
      <h1>Login Page</h1>
      <div className={classes.formMainSection}>
        <form className={classes.formSection} onSubmit={handleSubmit}>
          {loginInputs &&
            loginInputs.map((inp, index) => {
              return (
                <label
                  htmlFor={inp.name}
                  key={index}
                  className={classes.formLabel}
                >
                  <p>{inp.label}</p>
                  <div className={classes.inputContainer}>
                    <input
                      type={inp.type}
                      name={inp.placeholder}
                      id={inp.name}
                      value={loginValue[inp.name as keyof LoginInputsValType]}
                      onChange={(e) => {
                        handleOnChange(e, inp.name);
                      }}
                    />
                  </div>
                </label>
              );
            })}
          <div className={classes.btnContainer}>
            <button type="submit"> Login </button>
          </div>
        </form>

        <p
          onClick={() => {
            dispatch(setShowEmailSection());
          }}
        >
          Did you forget password?
        </p>
      </div>
    </div>
  );
}
 */

import { createUseStyles } from "react-jss";
import { loginInputs } from "../../../utilities/Arrays";
import type { LoginInputsValType } from "../../../utilities/Interfaces";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store/store";
import { setShowEmailSection } from "../../../Redux/slices/Common/showEmailSection";

const useStyles = createUseStyles({
  learningSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    marginTop: 90,
    marginBottom: 90,
    position: "relative",

    "@media (max-width:900px)": {
      flexDirection: "column-reverse",
    },

    "& img": {
      width: "100%",
      maxWidth: 500,
      borderRadius: 18,
      boxShadow: "0 15px 35px rgba(0, 0, 0, .08)",
      height: "500px",

      "@media (max-width:750px)": {
        width: "100%",
        maxWidth: "100%",
      },
    },
  },

  formContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    boxSizing: "border-box",

    "@media (max-width: 600px)": {
      padding: "20px 10px",
    },
  },

  formMainSection: {
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    padding: "35px",
    borderRadius: "20px",
    width: "50%",
    maxWidth: "600px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.36)",
    boxSizing: "border-box",

    "@media (max-width: 900px)": {
      width: "70%",
    },

    "@media (max-width: 800px)": {
      width: "90%",
    },

    "@media (max-width: 500px)": {
      width: "95%",
      padding: "25px 18px",
    },
  },

  formTitle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: 600,
    marginTop: 0,
    marginBottom: "30px",

    "@media (max-width: 500px)": {
      fontSize: "25px",
    },
  },

  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  formLabel: {
    display: "flex",
    gap: "30px",
    justifyContent: "space-between",
    alignItems: "center",

    "& p": {
      margin: "0px",
      fontSize: "15px",
      color: "#ffffff",
      fontWeight: 500,
      whiteSpace: "nowrap",

      "@media (max-width: 700px)": {
        fontSize: "12px",
      },

      "@media (max-width: 450px)": {
        fontSize: "11px",
      },
    },

    "@media (max-width: 500px)": {
      gap: "12px",
    },
  },

  inputContainer: {
    width: "70%",

    "@media (max-width: 700px)": {
      width: "60%",
    },

    "& input": {
      margin: "0px",
      width: "100%",
      height: "40px",
      borderRadius: "7px",
      border: "1px solid #9ca3af",
      outline: "none",
      padding: "5px 10px",
      boxSizing: "border-box",
      backgroundColor: "#f9fafb",
      color: "#1f2937",
      fontSize: "14px",
      transition: "all 0.2s ease",

      "&:focus": {
        border: "2px solid #43536c",
        boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.15)",
      },

      "&::placeholder": {
        color: "#6b7280",
      },
    },
  },

  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",

    "& button": {
      background:
        "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
      margin: "0px",
      width: "50%",
      height: "50px",
      borderRadius: "10px",
      outline: "none",
      padding: "5px",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.30)",
      fontSize: "16px",
      fontWeight: 600,
      transition: "all 0.2s ease",
            border: "1px solid #807f7f",


      "&:hover": {
        border: "1px solid white",
        transform: "translateY(-2px)",
        boxShadow: "0 12px 28px rgba(0, 0, 0, 0.40)",
      },

      "&:active": {
        transform: "translateY(0)",
      },

      "@media (max-width: 500px)": {
        width: "70%",
      },
    },
  },

  forgotPassword: {
    marginTop: "25px",
    marginBottom: 0,
    textAlign: "center",
    color: "#e5e7eb",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      color: "#ffffff",
      textDecoration: "underline",
    },
  },
});

interface PropsType {
  loginValue: LoginInputsValType;
  setLoginValue: Dispatch<SetStateAction<LoginInputsValType>>;
}

export default function LoginFirstSection({
  loginValue,
  setLoginValue,
}: PropsType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state: RootState) => state.loadingSlice);

  /* function */

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string,
  ) => {
    const { value } = e.target;

    setLoginValue((prev) => ({ ...prev, [val]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(" registerValue", loginValue);
    dispatch({
      type: "LOGIN_USERS_REQUEST",
      payload: loginValue,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setLoginValue({
        username: "",
        password: "",
      });
    }
  }, [isSuccess, setLoginValue]);

  /*  */

  return (
    <div className={classes.formContainer}>
      <div className={classes.formMainSection}>
        <h2 className={classes.formTitle}>Login Page</h2>

        <form className={classes.formSection} onSubmit={handleSubmit}>
          {loginInputs &&
            loginInputs.map((inp, index) => {
              return (
                <div className={classes.formLabel} key={index}>
                  <p>{inp.label}</p>

                  <div className={classes.inputContainer}>
                    <input
                      type={inp.type}
                      name={inp.placeholder}
                      id={inp.name}
                      value={loginValue[inp.name as keyof LoginInputsValType]}
                      onChange={(e) => {
                        handleOnChange(e, inp.name);
                      }}
                    />
                  </div>
                </div>
              );
            })}

          <div className={classes.btnContainer}>
            <button type="submit">Login</button>
          </div>
        </form>

        <p
          className={classes.forgotPassword}
          onClick={() => {
            dispatch(setShowEmailSection());
          }}
        >
          Did you forget password?
        </p>
      </div>
    </div>
  );
}
