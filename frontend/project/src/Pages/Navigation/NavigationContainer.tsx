import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../Redux/store/store";
import { useEffect } from "react";

export default function NavigationContainer() {
  const navigate = useNavigate();
  const { users, user } = useSelector((state: RootState) => state.userSlice);
  const userId = user?._id;
  const dispatch = useDispatch();

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
  //if (!userId || userId === undefined) return "";

  console.log(users);
  console.log("user ", user);
  console.log(" userId ", userId);

  return (
    <div>
      <ul>
        <li
          onClick={() => {
            handleNavigation("home");
          }}
        >
          Home
        </li>
        <li
          onClick={() => {
            handleNavigation("register");
          }}
        >
          Register
        </li>
        <li
          onClick={() => {
            handleNavigation("login");
          }}
        >
          Login
        </li>
        <li>LogOut</li>
        <li>Setting</li>
        <Link to={`Profile/${userId}`}>
          <li>Profile</li>
        </Link>
        <li
          onClick={() => {
            navigate("/update-user");
          }}
        >
          Update User
        </li>
        <div>
          <button
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
        </div>
      </ul>
    </div>
  );
}
