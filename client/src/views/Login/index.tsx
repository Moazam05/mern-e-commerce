import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "./components/validationSchema";
import { onKeyDown } from "../../utils";
import { InputText } from "primereact/inputtext";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
import { Button } from "primereact/button";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice";
import ToastAlert from "../../components/ToastAlert";
import DotLoader from "../../components/Spinner/dotLoader";

interface ISLoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // states
  const [showPassword, setShowPassword] = useState(false);
  const formValues = {
    email: "",
    password: "",
  };

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Login Api Bind
  const [loginUser, { isLoading }] = useLoginMutation();

  const LoginHandler = async (data: ISLoginForm) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const user: any = await loginUser(payload);

      if (user?.data?.status) {
        dispatch(setUser(user?.data));
        localStorage.setItem("user", JSON.stringify(user?.data));
        navigate("/");
      }
      if (user?.error) {
        ToastAlert(user?.error?.data?.message, "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      ToastAlert("Something went wrong!", "error");
    }
  };

  return (
    <div className="container">
      <div className="my-12 flex items-center justify-center flex-col">
        <div className="w-2/3">
          <div className="flex items-center justify-between my-8">
            <div className="text-xl text-gray-200 font-medium">
              Welcome to Online Shopping! Please login.
            </div>
            <div className="text-[14px] text-gray-200 font-medium cursor-pointer">
              New member?{" "}
              <span
                className="text-cyan hover:underline"
                onClick={() => navigate("/signup")}
              >
                Register
              </span>{" "}
              here.
            </div>
          </div>
          <div className="bg-white p-5">
            <div className="flex gap-5">
              <div className="w-[60%]">
                <div>
                  <Formik
                    initialValues={formValues}
                    onSubmit={(values: ISLoginForm) => {
                      LoginHandler(values);
                    }}
                    validationSchema={loginSchema}
                  >
                    {(props: FormikProps<ISLoginForm>) => {
                      const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                      } = props;

                      return (
                        <Form onKeyDown={onKeyDown} style={{ width: "100%" }}>
                          <div className="flex flex-col h-24">
                            <label htmlFor="email">Email</label>
                            <InputText
                              id="email"
                              aria-describedby="email-help"
                              type="email"
                              placeholder="Enter your email"
                              className="p-inputtext-sm mt-2"
                              value={values.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />

                            {errors.email && touched.email && (
                              <small
                                id="email-help"
                                className="text-[#f44336] mt-1 text-[12px]"
                              >
                                {errors.email}{" "}
                              </small>
                            )}
                          </div>
                          <div className="flex flex-col h-24 mt-1">
                            <label htmlFor="password">Password</label>
                            <span className="p-input-icon-right w-full">
                              {showPassword ? (
                                <GoEyeClosed
                                  size={24}
                                  className="text-gray-400 cursor-pointer pb-2"
                                  onClick={hideShowPassword}
                                />
                              ) : (
                                <MdOutlineRemoveRedEye
                                  size={24}
                                  className="text-gray-400 cursor-pointer pb-1"
                                  onClick={hideShowPassword}
                                />
                              )}
                              <InputText
                                id="password"
                                aria-describedby="password-help"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="p-inputtext-sm w-full mt-2"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                            </span>
                            <small
                              id="password-help"
                              className="text-[#f44336] mt-1 text-[12px]"
                            >
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </small>
                          </div>

                          <div
                            className="flex justify-end text-cyan text-[14px] mb-6 cursor-pointer hover:underline"
                            onClick={() => navigate("/forgot-password")}
                          >
                            Reset Password
                          </div>
                          <div className="flex flex-col gap-2 mb-2">
                            <button
                              type="submit"
                              className="bg-cyan text-white p-2 rounded-md"
                            >
                              {isLoading ? (
                                <DotLoader color="#fff" size={12} />
                              ) : (
                                "Login"
                              )}
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
              <div className="w-[40%]">
                <div className="text-gray-200 my-1">or login,with</div>
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  size="small"
                  //   onClick={googleLogin}
                >
                  <i className="bx bxl-google text-2xl"></i>
                  Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
