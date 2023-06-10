import React, { useState } from "react";
import "./LoginPage.css";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../utils/validationSchema";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (data) => {
      setIsLoading(true);
      const isLoggedIn = await auth.login(data);
      if (isLoggedIn) {
        setIsLoading(false);
        navigate("/verifyQuestionAnswers");
      } else {
        toast.error("Incorrect username or password.");
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Login</h2>
            <p className="welcomeText">Welcome to Trivia Titans</p>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="Email *"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="Password *"
                required
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
            <div>
              <NavLink to="/forgotpassword" className="link forgotpassword">
                Forgot Password?
              </NavLink>
            </div>
            {isLoading ? (
              <div className="btn btn-block spinnerContainer">
                <Spinner />
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-block"
                disabled={isLoading}
              >
                Login
              </button>
            )}

            <div className="createAccount">
              <NavLink to="/signuppage" className="link">
                Don't have an Account?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
