import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import TimerSection from "./childComponent/TimerSection";

export default function HomePage() {
  const { users } = useSelector((state: RootState) => state.userSlice);

  console.log(users);
  return (
    <div>
      <h1>Home Page</h1>
      <TimerSection />
    </div>
  );
}
