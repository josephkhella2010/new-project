import { toast } from "react-toastify";
import { store } from "../Redux/store/store";
import { setLogOut } from "../Redux/slices/User/UserSlice.js";

const API_URL = "https://backend-new-project-i1g5.onrender.com/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
  endpoint: string;
  method?: HttpMethod;
  data?: unknown;
  token?: string;
}

interface ApiErrorResponse {
  message?: string[];
  error?: string | string[];
}

/* const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
 */
const apiRequest = async <T>({
  endpoint,
  method = "GET",
  data,
  token,
}: ApiOptions): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: method !== "GET" && data ? JSON.stringify(data) : undefined,
    });

    const result = await response.json();
    console.log("STATUS:", response.status);
    console.log("RESULT:", result);

    // JWT expired
    if (response.status === 401) {
      toast.error("Session expired. Please login again.");
      store.dispatch(setLogOut());

      throw new Error("Session expired. Please login again.");
    }

    // Other API errors
    if (!response.ok) {
      const errorData = result as ApiErrorResponse;

      let errorMessage = "Something went wrong";

      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message.join(", ");
      } else if (typeof errorData.error === "string") {
        errorMessage = errorData.error;
      } else if (Array.isArray(errorData.error)) {
        errorMessage = errorData.error.join(", ");
      }

      toast.error(errorMessage);

      throw new Error(errorMessage);
    }

    // Success toast (if backend returns message)
    const successMessage = (result as ApiErrorResponse).message;

    if (Array.isArray(successMessage) && successMessage.length > 0) {
      toast.success(successMessage[0]);
    }

    return result as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("API ERROR:", error.message);
      throw error;
    }

    throw new Error("Something went wrong", {
      cause: error,
    });
  }
};

export default apiRequest;

//function for timer

let logoutTimer: ReturnType<typeof setTimeout>;

export const startTokenTimer = (token: string) => {
  console.log("startTokenTimer called");

  const payload = JSON.parse(atob(token.split(".")[1]));

  console.log("JWT PAYLOAD:", payload);

  const expireTime = payload.exp * 1000 - Date.now();

  console.log("Expire in ms:", expireTime);

  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }

  if (expireTime > 0) {
    logoutTimer = setTimeout(() => {
      console.log("TOKEN EXPIRED");

      toast.success(
        "Session time is over. You are logged out. Please login again.",
      );

      setTimeout(() => {
        store.dispatch(setLogOut());
        window.location.assign("/");
      }, 1500);
    }, expireTime);
  }
};
