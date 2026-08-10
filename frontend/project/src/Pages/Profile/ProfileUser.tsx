/* import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
import type { RootState } from "../../Redux/store/store";

export default function ProfileUser() {
  const { user } = useSelector((state: RootState) => state.userSlice);

  //const { userId } = useParams();
  const dispatch = useDispatch();
  const date = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString()
    : "";
  console.log("user", user);

  //function///////////////////////////////////////////////////
  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);

  return (
    <div>
      <h2> Profile</h2>
      <p>
        <strong>First Name:</strong>
        {user?.firstName}
      </p>
      <p>
        <strong>Last Name:</strong>
        {user?.lastName}
      </p>
      <p>
        <strong>Email:</strong>
        {user?.email}
      </p>
      <p>
        <strong>Date of Birth:</strong>
        {date}
      </p>
    </div>
  );
}
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
import type { RootState } from "../../Redux/store/store";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainContainer: {
    padding: "50px 20px",
  },
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
    border: "1px solid #e5e7eb",
    padding: "50px 30px",
  },

  title: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#1f2937",
    fontSize: "28px",
    fontWeight: 600,
  },

  info: {
    display: "flex",
    alignItems: "center",
    padding: "14px 0",
    margin: 0,
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "16px",

    "&:last-child": {
      borderBottom: "none",
    },
  },

  label: {
    display: "inline-block",
    minWidth: "140px",
    color: "#111827",
    fontWeight: 600,
  },

  value: {
    color: "#4b5563",
  },
});

export default function ProfileUser() {
  const { user } = useSelector((state: RootState) => state.userSlice);

  //const { userId } = useParams();
  const dispatch = useDispatch();

  const classes = useStyles();

  const date = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString()
    : "";

  console.log("user", user);

  /*  */
  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h2 className={classes.title}>Profile</h2>

        <p className={classes.info}>
          <strong className={classes.label}>First Name:</strong>
          <span className={classes.value}>{user?.firstName}</span>
        </p>

        <p className={classes.info}>
          <strong className={classes.label}>Last Name:</strong>
          <span className={classes.value}>{user?.lastName}</span>
        </p>

        <p className={classes.info}>
          <strong className={classes.label}>Email:</strong>
          <span className={classes.value}>{user?.email}</span>
        </p>

        <p className={classes.info}>
          <strong className={classes.label}>Date of Birth:</strong>
          <span className={classes.value}>{date}</span>
        </p>
      </div>
    </div>
  );
}
