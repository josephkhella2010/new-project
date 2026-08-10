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

export interface UpdateInputsType {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: string;
  password: string;
}

export interface MessageType {
  _id: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatType {
  _id: string;
  messages: MessageType[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatAIType {
  _id: string;
  userId: string;
  chats: ChatType[];
  createdAt?: string;
  updatedAt?: string;
}
export interface QuestionInputType {
  question: string;
}
