import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client.js";

export default function AddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    axiosClient
      .post("/users", user)
      .then(() => {
        navigate("/users");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <h1>New User</h1>
      <div className="card animated fadeInDown">
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <input
            value={user.name}
            onChange={(ev) => setUser({ ...user, name: ev.target.value })}
            placeholder="Name"
          />
          <input
            value={user.email}
            onChange={(ev) => setUser({ ...user, email: ev.target.value })}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(ev) => setUser({ ...user, password: ev.target.value })}
            placeholder="Password"
          />
          <input
            type="password"
            onChange={(ev) =>
              setUser({ ...user, password_confirmation: ev.target.value })
            }
            placeholder="Password Confirmation"
          />
          <button className="btn">Save</button>
        </form>
      </div>
    </>
  );
}
