import { useNavigate } from "react-router-dom";

export default function NavigationContainer() {
  const navigate = useNavigate();

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
        <li></li>
      </ul>
    </div>
  );
}
