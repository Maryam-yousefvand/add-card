import { addCard } from "features/auth/authSlice";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCard = () => {
  const [selectOption, setSelectOption] = useState();
  const dispatch = useDispatch();
  const options = [
    { value: "meli", label: "ملی" },
    { value: "tejarat", label: "تجارت" },
    { value: "saderat", label: "صادرات" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-[70%]">
        <Formik
          initialValues={{
            name: "",
            number: "",
            exp: "",
            cv2: "",
          }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            values.name = selectOption;
            console.log(values);
            dispatch(addCard(values));
            toast.success("کارت با موفقیت ثبت شد", {
              style: {
                fontFamily: "vazir",
              },
            });
            resetForm();
          }}
        >
          <Form>
            <div className="">
              <Select
                defaultValue={selectOption}
                onChange={setSelectOption}
                options={options}
              />
            </div>

            <div className="mt-10 flex items-center">
              <label htmlFor="" className="flex  w-[10%]">
                شماره کارت :
              </label>
              <Field
                type="text"
                name="number"
                className="bg-white border border-gray shadow-sm mr-5 w-[90%] py-2 px-2"
              />
            </div>

            <div className="mt-10 flex items-center">
              <label htmlFor="" className="flex  w-[10%]">
                تاریخ انقضا :
              </label>
              <Field
                type="text"
                name="exp"
                className="bg-white border border-gray shadow-sm mr-5 w-[90%] py-2 px-2"
              />
            </div>

            <div className="mt-10 flex items-center">
              <label htmlFor="" className="flex  w-[10%]">
                cv2 :
              </label>
              <Field
                type="text"
                name="cv2"
                className="bg-white border border-gray shadow-sm mr-5 w-[90%] py-2 px-2"
              />
            </div>

            <div className="mt-14 flex justify-end ">
              <button
                type="submit"
                className="bg-blue-100 py-3 w-32 flex justify-center "
              >
                ثبت
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddCard;
