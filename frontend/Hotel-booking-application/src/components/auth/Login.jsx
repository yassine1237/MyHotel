import { useState } from "react";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(login); // result contains token, roles, email, id, firstName, lastName
      console.log("Login response:", result);

      if (result && result.token) {
        // ✅ Store user data in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.id);
        localStorage.setItem("userEmail", result.email);
        localStorage.setItem("userFirstName", result.firstName || "");
        localStorage.setItem("userLastName", result.lastName || "");

        // roles might be an array → store first one cleanly
        const role = Array.isArray(result.roles) ? result.roles[0] : result.roles;
        localStorage.setItem("userRole", role);

        // Optional: use AuthProvider context
        auth.handleLogin(result);

        // Redirect after login
        navigate(redirectUrl, { replace: true });
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Login failed. Please try again.");
    }

    setTimeout(() => setErrorMessage(""), 4000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Dont have an account yet? <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
