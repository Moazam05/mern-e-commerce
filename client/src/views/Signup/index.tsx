import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikProps } from "formik";
import { onKeyDown } from "../../utils";
import { signupSchema } from "./components/validationSchema";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoEyeClosed } from "react-icons/go";
import { Button } from "primereact/button";
import { useSignupMutation } from "../../redux/api/authApiSlice";
import ToastAlert from "../../components/ToastAlert";
import DotLoader from "../../components/Spinner/dotLoader";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const formValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const hideShowConfirmPassword = () => {
    setConfirmPasswordShow(!confirmPasswordShow);
  };

  // Sign Up Api Bind
  const [signupUser, { isLoading }] = useSignupMutation();

  const SignupHandler = async (data: SignupForm) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    };

    try {
      const user: any = await signupUser(payload);

      if (user?.data?.status) {
        ToastAlert("User Successfully Created", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
      if (user?.error) {
        ToastAlert(user?.error?.data?.message, "error");
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  return (
    <div className="container">
      <div className="my-12 flex items-center justify-center flex-col">
        <div className="w-2/3">
          <div className="flex items-center justify-between my-8">
            <div className="text-xl text-gray-200 font-medium">
              Welcome Back
            </div>
            <div className="text-[14px] text-gray-200 font-medium cursor-pointer">
              Already Account?{" "}
              <span
                className="text-cyan hover:underline"
                onClick={() => navigate("/login")}
              >
                Login{" "}
              </span>
              here.
            </div>
          </div>

          <div className="bg-white p-5">
            <div className="flex gap-5 w-full">
              <Formik
                initialValues={formValues}
                onSubmit={(values: SignupForm) => {
                  SignupHandler(values);
                }}
                validationSchema={signupSchema}
              >
                {(props: FormikProps<SignupForm>) => {
                  const { values, touched, errors, handleBlur, handleChange } =
                    props;

                  return (
                    <Form
                      onKeyDown={onKeyDown}
                      style={{
                        width: "100%",
                      }}
                    >
                      {/* 1st Row */}
                      <div className="w-full flex gap-4">
                        <div className="w-full flex flex-col h-24">
                          <label htmlFor="name">Name</label>
                          <InputText
                            id="name"
                            aria-describedby="name-help"
                            type="name"
                            placeholder="Enter your name"
                            className="p-inputtext-sm mt-2"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />

                          {errors.name && touched.name && (
                            <small
                              id="name-help"
                              className="text-[#f44336] mt-1 text-[12px]"
                            >
                              {errors.name}
                            </small>
                          )}
                        </div>
                        <div className="w-full flex flex-col h-24">
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
                              {errors.email}
                            </small>
                          )}
                        </div>
                      </div>
                      {/* 2nd Row */}
                      <div className="w-full flex gap-4">
                        <div className="flex flex-col w-[50%] h-28 mt-1">
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
                              placeholder="Password"
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

                        <div className="flex flex-col w-[50%] h-28 mt-1">
                          <label htmlFor="passwordConfirm">
                            Confirm Password
                          </label>
                          <span className="p-input-icon-right w-full">
                            {confirmPasswordShow ? (
                              <GoEyeClosed
                                size={24}
                                className="text-gray-400 cursor-pointer pb-2"
                                onClick={hideShowConfirmPassword}
                              />
                            ) : (
                              <MdOutlineRemoveRedEye
                                size={24}
                                className="text-gray-400 cursor-pointer pb-1"
                                onClick={hideShowConfirmPassword}
                              />
                            )}
                            <InputText
                              id="passwordConfirm"
                              aria-describedby="passwordConfirm-help"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              className="p-inputtext-sm w-full mt-2"
                              value={values.passwordConfirm}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </span>
                          <small
                            id="passwordConfirm-help"
                            className="text-[#f44336] mt-1 text-[12px]"
                          >
                            {errors.passwordConfirm &&
                              touched.passwordConfirm &&
                              errors.passwordConfirm}
                          </small>
                        </div>
                      </div>

                      {/* 3rd Row */}
                      <div className="w-full flex gap-4 mt-3 mb-2">
                        <div className="flex w-1/2 flex-col gap-2">
                          <button
                            type="submit"
                            className="bg-cyan text-white p-2 rounded-md"
                          >
                            {isLoading ? (
                              <DotLoader color="#fff" size={12} />
                            ) : (
                              "Sign Up"
                            )}
                          </button>
                        </div>

                        <Button
                          className="w-1/2 flex h-10 items-center justify-center gap-2"
                          size="small"
                          type="button"
                          //   onClick={googleLogin}
                        >
                          <i className="bx bxl-google text-2xl"></i>
                          Google
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
