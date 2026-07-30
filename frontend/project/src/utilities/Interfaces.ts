export interface RegisterInputsType {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}
export interface LoginInputsType {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

export interface RegisterInputsValType {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInputsValType {
  username: string;
  password: string;
}

export interface UsersType {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  verificationCode?: number | null;
  codeExpire?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
