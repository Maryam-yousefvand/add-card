import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().trim().required("نام کاربری الزامی می باشد"),
  password: Yup.string().trim().required("گذرواژه الزامی می باشد").min(5, "نام کاربری نباید کمتر از 5 کاراکتر باشد"),

});
