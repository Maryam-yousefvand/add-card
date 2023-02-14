import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().trim().required("نام کاربری الزامی می باشد"),
  password: Yup.string().trim().required("رمز عبور الزامی می باشد")

});
