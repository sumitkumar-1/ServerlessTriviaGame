import React, { useState } from "react";
import "./LoginPage.css";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../utils/validationSchema";
import { LoginSocialGoogle } from "reactjs-social-login";
import {
  CreateUser,
  SaveUser,
  VerifyEmailWithoutCode,
} from "../../services/user.service";

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

  const handleGoogleLogin = async (response) => {
    try {
      console.log("RESPONE", response);
      setIsLoading(true);
      const requestBody = {
        email: response?.email,
        password: "Xyzab@123",
        family_name: response?.family_name,
        given_name: response?.given_name,
        gender: "",
        phone_number: "",
      };
      const responseData = await CreateUser(requestBody);

      if (responseData?.data?.error?.code === "UsernameExistsException") {
        const loginRequestData = {
          email: response?.email,
          password: "Xyzab@123",
        };
        const loginResponse = await auth.login(loginRequestData);
        if (loginResponse) {
          localStorage.setItem("mfaVerified", true);
          toast.success("Login Success!");
          navigate("/");
          setIsLoading(false);
        } else {
          toast.error("Internal Server Error.");
          setIsLoading(false);
          navigate("/login");
          setIsLoading(false);
        }
      } else {
        if (!responseData?.data?.error) {
          const verifyEmailRequestBody = {
            email: response?.email,
          };

          const verifyEmailResponse = await VerifyEmailWithoutCode(
            verifyEmailRequestBody
          );

          if (verifyEmailResponse?.data?.success) {
            const loginRequestData = {
              email: response?.email,
              password: "Xyzab@123",
            };
            const loginResponse = await auth.login(loginRequestData);
            if (loginResponse) {
              localStorage.setItem("mfaVerified", true);
              const saveUserRequestBody = {
                id: localStorage.getItem("UserId"),
              };
              const saveUserResponse = await SaveUser(saveUserRequestBody);
              if (!saveUserResponse?.data?.error) {
                toast.success("Login Success!");
                navigate("/");
                setIsLoading(false);
              } else {
                setIsLoading(false);
                toast.error(
                  saveUserResponse?.data?.error
                    ? saveUserResponse?.data?.error?.message
                    : "Internal Server Error."
                );
              }
            } else {
              toast.error("Internal Server Error.");
              setIsLoading(false);
              navigate("/login");
              setIsLoading(false);
            }
          }
        }
      }
    } catch (error) {
      toast.error("Internal Server Error.");
    }
  };

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
            <h1 className="orhorizontalline">OR</h1>
            <div className="socialMediaLoginContainer">
              <LoginSocialGoogle
                client_id={
                  "623682632214-uv3q82gp3luu86uh1np2bgeard5eokps.apps.googleusercontent.com"
                }
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  handleGoogleLogin(data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
                className="loginwithgoogle"
              >
                <img
                  className="loginwithgoogle"
                  src={require("../../assets/GoogleIcon.png")}
                  alt="googleicon"
                />
              </LoginSocialGoogle>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
