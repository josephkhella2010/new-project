import { useState } from "react";
import RegisterFirstSection from "./childComponent/RegisterFirstSection";
import type { RegisterInputsValType } from "../../utilities/Interfaces";
import EmailSection from "../../utilities/Common/EmailSection";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainContainer: {
    padding: "70px 20px",
  },
});

export default function RegisterPage() {
  const classes = useStyles();
  const { showEmailSection } = useSelector(
    (state: RootState) => state.ShowEmailSectionSlice,
  );
  const [registerValue, setRegisterValue] = useState<RegisterInputsValType>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className={classes.mainContainer}>
      <RegisterFirstSection
        registerValue={registerValue}
        setRegisterValue={setRegisterValue}
      />
      {showEmailSection && <EmailSection />}
    </div>
  );
}
