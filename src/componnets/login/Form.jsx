import { login } from "features/auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "validation/loginValidation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMsg = useSelector((state) => state.auth.error);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [error, setError] = useState();

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            dispatch(login({ values, navigate, setError }));
          }}
        >
          <Form>
            <div
              className=" w-full min-h-screen flex justify-center items-center bg-red-900
             bg-gradient-to-tr from-slate-900  "
            >
              <div
                className="xs:w-[350px]  md:w-[400px] lg:w-[450px] px-7  shadow-2xl rounded-lg pt-5 pb-10
               bg-white"
              >
                <div className="flex flex-col my-3 ">
                  <label htmlFor="">نام کاربری</label>
                  <Field
                    type="text"
                    name="email"
                    className="bg-gray-200 py-2 mt-5 px-2"
                    onKeyUp={() => setError("")}
                  />
                  <ErrorMessage
                    name="email"
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
                    onKeyUp={() => setError("")}
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
                    className=" bg-slate-700 shadow-md w-full mt-10 py-2 flex justify-center  text-white   "
                  >
                    ورود
                  </button>
                </div>
                <div className="text-sm text-red-500  ">{error}</div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
