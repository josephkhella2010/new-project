/* 
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../Redux/store/store";
import { useEffect } from "react";
import { setLogOut } from "../../Redux/slices/User/UserSlice";
import { setClearChats } from "../../Redux/slices/chatSlice/ChatSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navigation: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    margin: 0,
    listStyle: "none",
    backgroundColor: "#1f2937",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    flexWrap: "wrap",
  },

  item: {
    padding: "10px 16px",
    color: "#ffffff",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    fontSize: "15px",
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#374151",
      transform: "translateY(-1px)",
    },
  },

  link: {
    display: "block",
    padding: "10px 16px",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    fontSize: "15px",
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#374151",
      color: "#60a5fa",
    },
  },

  deleteButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 500,
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#b91c1c",
      transform: "translateY(-1px)",
    },
  },

  setting: {
    padding: "10px 16px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 500,
  },
});

export default function NavigationContainer() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const userId = user?._id;
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleNavigation = (name: string) => {
    switch (name) {
      case "home":
        navigate("/");
        break;

      case "register":
        navigate("/register");
        break;

      case "login":
        navigate("/login");
        break;

      default:
        navigate("/");
        break;
    }
  };

  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);

  return (
    <ul className={classes.navigation}>
      <li
        className={classes.item}
        onClick={() => {
          handleNavigation("home");
        }}
      >
        Home
      </li>

      <li
        className={classes.item}
        onClick={() => {
          handleNavigation("register");
        }}
      >
        Register
      </li>

      <li
        className={classes.item}
        onClick={() => {
          handleNavigation("login");
        }}
      >
        Login
      </li>

      <li
        className={classes.item}
        onClick={() => {
          dispatch(setLogOut());
          dispatch(setClearChats());
        }}
      >
        LogOut
      </li>

      <li className={classes.setting}>Setting</li>

      <li className={classes.item}>
        <Link to={`Profile/${userId}`} className={classes.link}>
          Profile
        </Link>
      </li>

      <li
        className={classes.item}
        onClick={() => {
          navigate("/update-user");
        }}
      >
        Update User
      </li>

      <li>
        <button
          className={classes.deleteButton}
          onClick={() => {
            dispatch({
              type: "DELETE_USER_REQUEST",
              payload: {
                userId: String(userId),
              },
            });
          }}
        >
          delete User
        </button>
      </li>

      <li
        className={classes.item}
        onClick={() => {
          navigate("/chats");
        }}
      >
        chats
      </li>
    </ul>
  );
}
 */

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../Redux/store/store";
import { useEffect, useRef, useState } from "react";
import { setLogOut } from "../../Redux/slices/User/UserSlice";
import { setClearChats } from "../../Redux/slices/chatSlice/ChatSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navigation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    margin: 0,
    listStyle: "none",
    backgroundColor: "#1f2937",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },

  leftNavigation: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  item: {
    padding: "10px 16px",
    color: "#ffffff",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    fontSize: "15px",
    fontWeight: 500,
    "@media (max-width: 700px)": {
      padding: "5px 8px",
    },

    "&:hover": {
      backgroundColor: "#374151",
      transform: "translateY(-1px)",
    },
  },

  settingContainer: {
    position: "relative",
  },

  setting: {
    padding: "10px 16px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    borderRadius: "6px",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#374151",
    },
  },

  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    minWidth: "180px",
    padding: "8px",
    marginTop: "5px",
    backgroundColor: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
    zIndex: 1000,
  },

  dropdownItem: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: "6px",
    color: "#ffffff",
    textDecoration: "none",
    backgroundColor: "transparent",
    border: "none",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#374151",
    },
  },

  deleteButton: {
    display: "block",
    width: "100%",
    padding: "10px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "#fca5a5",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#7f1d1d",
      color: "#ffffff",
    },
  },
});

export default function NavigationContainer() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.userSlice);
  const userId = user?._id;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showSetting, setShowSetting] = useState(false);
  const refDropdown = useRef<HTMLDivElement | null>(null);
  //const token = localStorage.getItem("token");

  const handleNavigation = (name: string) => {
    switch (name) {
      case "home":
        navigate("/");
        break;

      case "register":
        navigate("/register");
        break;

      case "login":
        navigate("/login");
        break;

      default:
        navigate("/");
        break;
    }
  };

  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        refDropdown.current &&
        !refDropdown.current.contains(e.target as Node)
      ) {
        setShowSetting(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <ul className={classes.navigation}>
      {/* LEFT SIDE */}
      <div className={classes.leftNavigation}>
        <li
          className={classes.item}
          onClick={() => {
            handleNavigation("home");
          }}
        >
          Home
        </li>

        {!token && (
          <>
            <li
              className={classes.item}
              onClick={() => {
                handleNavigation("register");
              }}
            >
              Register
            </li>

            <li
              className={classes.item}
              onClick={() => {
                handleNavigation("login");
              }}
            >
              Login
            </li>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className={classes.settingContainer} ref={refDropdown}>
        <div
          className={classes.setting}
          onClick={() => {
            setShowSetting((prev) => !prev);
          }}
        >
          Setting ▾
        </div>

        {showSetting && (
          <div className={classes.dropdown}>
            {token && (
              <>
                <li
                  className={classes.item}
                  onClick={() => {
                    navigate("/chats");
                    setShowSetting(false);
                  }}
                >
                  chats
                </li>
                <Link
                  to={`Profile/${userId}`}
                  className={classes.dropdownItem}
                  onClick={() => setShowSetting(false)}
                >
                  Profile
                </Link>

                <button
                  className={classes.dropdownItem}
                  onClick={() => {
                    navigate("/update-user");
                    setShowSetting(false);
                  }}
                >
                  Update User
                </button>

                <button
                  className={classes.deleteButton}
                  onClick={() => {
                    dispatch({
                      type: "DELETE_USER_REQUEST",
                      payload: {
                        userId: String(userId),
                      },
                    });
                    dispatch(setLogOut());
                    dispatch(setClearChats());

                    setShowSetting(false);
                  }}
                >
                  Delete User
                </button>

                <button
                  className={classes.dropdownItem}
                  onClick={() => {
                    dispatch(setLogOut());
                    dispatch(setClearChats());
                    setShowSetting(false);
                  }}
                >
                  LogOut
                </button>
              </>
            )}

            {!token && (
              <div className={classes.dropdownItem}>No account settings</div>
            )}
          </div>
        )}
      </div>
    </ul>
  );
}
