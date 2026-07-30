import type { LoginInputsType, RegisterInputsType } from "./Interfaces";

export const registerInputs: RegisterInputsType[] = [
  { name: "firstName", type: "text", label: "First Name" },
  { name: "lastName", type: "text", label: "Last Name" },
  { name: "username", type: "text", label: "Username" },
  { name: "email", type: "text", label: "Email" },
  { name: "dateOfBirth", type: "date", label: "Date of Birth" },
  { name: "password", type: "password", label: "Password" },
  { name: "confirmPassword", type: "password", label: "Confirm Password" },
].map((inp) =>
  inp.name === "confirmPassword"
    ? { ...inp, placeholder: "Please confirm Password" }
    : { ...inp, placeholder: `Please enter ${inp.label}` },
);

export const loginInputs: LoginInputsType[] = [
  {
    name: "username",
    type: "text",
    label: "Username",
  },
  { name: "password", type: "password", label: "password" },
].map((inp) =>
  inp.name === "username"
    ? {
        ...inp,
        placeholder: `Please fill username or Email`,
      }
    : { ...inp, placeholder: `Please enter ${inp.label}` },
);
