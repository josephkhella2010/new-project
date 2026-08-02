import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
//import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editInputs } from "../../utilities/Arrays";
import type { UpdateInputsType } from "../../utilities/Interfaces";

export default function UpdateUser() {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const [editInputsVal, setEditInputsVal] = useState<UpdateInputsType>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
  });
  //const navigate = useNavigate();

  //const { userId } = useParams();
  const dispatch = useDispatch();

  console.log("user", user);

  const handleEdit = () => {
    setEditInputsVal({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      password: "",
    });
  };

  const handleSave = () => {
    if (user) {
      dispatch({
        type: "UPDATE_USER_REQUEST",
        payload: {
          userId: user._id,
          user: {
            ...editInputsVal,
          },
        },
      });
    }
  };

  /*  */
  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);
  return (
    <div>
      <h1>Update User</h1>
      <form action="">
        {editInputs &&
          editInputs.map((inp, index: number) => {
            return (
              <label key={index}>
                <p>{inp.label}</p>
                <input
                  type={inp.type}
                  name={inp.name}
                  placeholder={inp.placeholder}
                  value={editInputsVal[inp.name as keyof UpdateInputsType]}
                  onChange={(e) =>
                    setEditInputsVal((prev) => ({
                      ...prev,
                      [inp.name]: e.target.value,
                    }))
                  }
                />
              </label>
            );
          })}
      </form>
      <div>
        <button onClick={() => handleEdit()}>Edit</button>
        <button onClick={() => handleSave()}>Save</button>
      </div>
    </div>
  );
}
