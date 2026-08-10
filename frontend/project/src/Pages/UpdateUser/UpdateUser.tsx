/* import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
//import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editInputs } from "../../utilities/Arrays";
import type { UpdateInputsType } from "../../utilities/Interfaces";

export default function UpdateUser() {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const [editInputsVal, setEditInputsVal] = useState<UpdateInputsType>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
  });
  //const navigate = useNavigate();

  //const { userId } = useParams();
  const dispatch = useDispatch();

  console.log("user", user);

  const handleEdit = () => {
    setEditInputsVal({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      password: "",
    });
  };

  const handleSave = () => {
    if (user) {
      dispatch({
        type: "UPDATE_USER_REQUEST",
        payload: {
          userId: user._id,
          user: {
            ...editInputsVal,
          },
        },
      });
    }
  };

  /////////////////////////////////////////////
  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);
  return (
    <div>
      <h1>Update User</h1>
      <form action="">
        {editInputs &&
          editInputs.map((inp, index: number) => {
            return (
              <label key={index}>
                <p>{inp.label}</p>
                <input
                  type={inp.type}
                  name={inp.name}
                  placeholder={inp.placeholder}
                  value={editInputsVal[inp.name as keyof UpdateInputsType]}
                  onChange={(e) =>
                    setEditInputsVal((prev) => ({
                      ...prev,
                      [inp.name]: e.target.value,
                    }))
                  }
                />
              </label>
            );
          })}
      </form>
      <div>
        <button onClick={() => handleEdit()}>Edit</button>
        <button onClick={() => handleSave()}>Save</button>
      </div>
    </div>
  );
}
 */

import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
//import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editInputs } from "../../utilities/Arrays";
import type { UpdateInputsType } from "../../utilities/Interfaces";

const useStyles = createUseStyles({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 20px",
    boxSizing: "border-box",
  },

  title: {
    color: "#1f2937",
    fontSize: "30px",
    fontWeight: 600,
    marginBottom: "30px",
    textAlign: "center",

    "@media (max-width: 500px)": {
      fontSize: "25px",
    },
  },

  form: {
    width: "50%",
    maxWidth: "650px",
    padding: "35px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.36)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "20px",

    "@media (max-width: 900px)": {
      width: "70%",
    },

    "@media (max-width: 700px)": {
      width: "90%",
    },

    "@media (max-width: 500px)": {
      width: "100%",
      padding: "25px 18px",
    },
  },

  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",

    "& p": {
      margin: 0,
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: 500,
      minWidth: "120px",

      "@media (max-width: 600px)": {
        fontSize: "12px",
        minWidth: "90px",
      },

      "@media (max-width: 400px)": {
        fontSize: "11px",
        minWidth: "75px",
      },
    },

    "@media (max-width: 500px)": {
      gap: "10px",
    },
  },

  input: {
    width: "65%",
    height: "40px",
    padding: "5px 10px",
    boxSizing: "border-box",
    borderRadius: "7px",
    border: "1px solid #9ca3af",
    outline: "none",
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

    "@media (max-width: 700px)": {
      width: "60%",
    },

    "@media (max-width: 500px)": {
      width: "65%",
    },
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "25px",

    "@media (max-width: 400px)": {
      gap: "10px",
    },
  },

  button: {
    width: "140px",
    height: "45px",
    borderRadius: "8px",
    border: "1px solid #807f7f",

    outline: "none",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
    transition: "all 0.2s ease",

    "&:hover": {
      border: "1px solid #ffffff",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
    },

    "&:active": {
      transform: "translateY(0)",
    },

    "@media (max-width: 450px)": {
      width: "120px",
      fontSize: "13px",
    },
  },

  saveButton: {
    background:
      "linear-gradient(135deg, #33527c 0%, #283b68 50%, #1f2937 100%)",
  },
});

export default function UpdateUser() {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.userSlice);

  const [editInputsVal, setEditInputsVal] = useState<UpdateInputsType>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
  });

  //const navigate = useNavigate();

  //const { userId } = useParams();
  const dispatch = useDispatch();

  console.log("user", user);

  const handleEdit = () => {
    setEditInputsVal({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      password: "",
    });
    setIsEdit(true);
  };

  const handleSave = () => {
    if (user) {
      dispatch({
        type: "UPDATE_USER_REQUEST",
        payload: {
          userId: user._id,
          user: {
            ...editInputsVal,
          },
        },
      });
      setEditInputsVal({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        dateOfBirth: "",
        password: "",
      });
      setIsEdit(false);
    }
  };

  /*  */

  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Update User</h1>

      <form className={classes.form} action="">
        {editInputs &&
          editInputs.map((inp, index: number) => {
            return (
              <label className={classes.label} key={index}>
                <p>{inp.label}</p>

                <input
                  className={classes.input}
                  type={inp.type}
                  name={inp.name}
                  placeholder={inp.placeholder}
                  value={editInputsVal[inp.name as keyof UpdateInputsType]}
                  onChange={(e) =>
                    setEditInputsVal((prev) => ({
                      ...prev,
                      [inp.name]: e.target.value,
                    }))
                  }
                />
              </label>
            );
          })}
      </form>

      <div className={classes.buttonContainer}>
        {!isEdit && (
          <button className={classes.button} onClick={() => handleEdit()}>
            Edit
          </button>
        )}

        {isEdit && (
          <button
            className={`${classes.button} ${classes.saveButton}`}
            onClick={() => handleSave()}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
