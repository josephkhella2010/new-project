import { useState } from "react";
import LoginFirstSection from "./childComponent/LoginFirstSection";
import type { LoginInputsValType } from "../../utilities/Interfaces";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import EmailSection from "../../utilities/Common/EmailSection";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainContainer: {
    padding: "70px 20px",
  },
});

export default function LoginPage() {
  const classes = useStyles();

  const { showEmailSection } = useSelector(
    (state: RootState) => state.ShowEmailSectionSlice,
  );
  const [loginValue, setLoginValue] = useState<LoginInputsValType>({
    username: "",
    password: "",
  });
  return (
    <div className={classes.mainContainer}>
      <LoginFirstSection
        loginValue={loginValue}
        setLoginValue={setLoginValue}
      />
      {showEmailSection && <EmailSection />}
    </div>
  );
}
