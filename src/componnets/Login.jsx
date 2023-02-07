import { login } from "features/auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "validation/loginValidation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            dispatch(login(values));
            navigate("/home/list-cards");
          }}
        >
          <Form>
            <div className="border w-full min-h-screen flex justify-center items-center bg-gray-200">
              <div className="xs:w-[70%] md:w-[50%] px-7 lg:w-[30%] shadow-lg pt-5 pb-10 bg-white">
                <div className="flex flex-col my-3 ">
                  <label htmlFor="">نام کاربری</label>
                  <Field
                    type="text"
                    name="username"
                    className="bg-gray-200 py-2 mt-5 px-2"
                  />
                  <ErrorMessage
                    name="username"
                    render={(msg) => (
                      <div className="text-red-500 py-2 text-sm">{msg}</div>
                    )}
                  ></ErrorMessage>
                </div>
                <div className="flex flex-col my-3">
                  <label htmlFor=""> رمز عبور</label>
                  <Field
                    type="password"
                    name="password"
                    className="bg-gray-200 py-2 mt-5 px-2"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <div className="text-red-500 py-2 text-sm ">{msg}</div>
                    )}
                  ></ErrorMessage>
                </div>
                <div className="my-3">
                  <button
                    type="submit"
                    className="bg-blue-700 w-full mt-10 py-2 flex justify-center  text-white   "
                  >
                    ورود
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
