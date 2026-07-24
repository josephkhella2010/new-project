import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";

export default function HomePage() {
  const { users } = useSelector((state: RootState) => state.userSlice);
  console.log(users);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
