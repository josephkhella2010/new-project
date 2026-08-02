import { useEffect } from "react";
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

  /*  */
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
