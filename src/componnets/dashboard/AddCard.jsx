import { addCard } from "features/card/cardSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCardSchema } from "validation/addCard";

const AddCard = () => {
  const [selectOption, setSelectOption] = useState();
  const dispatch = useDispatch();
  const options = [
    { value: "meli", label: "ملی" },
    { value: "tejarat", label: "تجارت" },
    { value: "saderat", label: "صادرات" },
  ];
  const [refLng, setRefLng] = useState(0);
  const refNumber1 = useRef();
  const refNumber2 = useRef();
  const refNumber3 = useRef();

  const errorName = [
    "number1",
    "number2",
    "number3",
    "number4",
    "exp_year",
    "exp_month",
    "cvv2",
  ];

  const inputFocusHandle = (refName) => {
    setRefLng(refName.current?.value?.length);
    if (refLng === 3) {
      refName?.current?.nextElementSibling.focus();
      setRefLng(0);
    }
  };

  return (
    <div>
      <p className="pr-14 text-slate-800 text-3xl font-extrabold pt-20 font-[bYekan]">
        ثبت کارت
      </p>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-[70%]">
          <Formik
            initialValues={{
              bankName: "",
              number1: "",
              number2: "",
              number3: "",
              number4: "",
              exp_year: "",
              exp_month: "",
              cvv2: "",
            }}
            validationSchema={addCardSchema}
            // enableReinitialize={true}
            onSubmit={async (values, { resetForm, setFieldValue }) => {
              values.bankName = selectOption?.label;
              dispatch(addCard({ values, resetForm }));
              // resetForm();
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className=" flex flex-col items-center pb-20">
                <div className="w-[60%] font-[bYekan] ">
                  <Select
                    options={options}
                    defaultValue={selectOption}
                    onChange={(defaultValue) => {
                      values.bankName = defaultValue;
                      setSelectOption(defaultValue);
                    }}
                    placeholder="بانک..."
                  />
                  {!selectOption && (
                    <ErrorMessage
                      name="bankName"
                      render={(msg) => (
                        <div className="text-red-500 py-2 text-sm">{msg}</div>
                      )}
                    />
                  )}
                </div>

                <div className="flex justify-center">
                  <div
                    className="pt-10 pb-14 mt-10 w-[60%] bg-white border-2 border-slate-800 rounded-lg
                  shadow-lg  "
                  >
                    <p
                      className="flex justify-center items-center bg-slate-700 text-sm font-extrabold h-9 
                      shadow-sm font-[bYekan] text-white
                   "
                    >
                      {selectOption && `بانک ${selectOption?.label}`}
                    </p>

                    <div
                      className="mt-10 flex justify-around items-center  "
                      style={{ direction: "ltr" }}
                    >
                      <Field
                        type="text"
                        name="number1"
                        className="bg-none flex justify-center
                     border-b-2	border-gray-800 w-[20%] py-1 px-2 tracking-[10px]
                    text-xl text-gray-700 text-center 
                    "
                        maxlength="4"
                        innerRef={refNumber1}
                        onKeyUp={() => {
                          inputFocusHandle(refNumber1);
                        }}
                      />
                      <Field
                        type="text"
                        name="number2"
                        className="bg-none flex justify-center
                     border-b-2	border-gray-800 w-[20%] py-1 px-2 tracking-[10px]
                    text-xl text-gray-700 text-center
                    "
                        maxlength="4"
                        innerRef={refNumber2}
                        onKeyUp={() => {
                          inputFocusHandle(refNumber2);
                        }}
                      />
                      <Field
                        type="text"
                        name="number3"
                        className="bg-none flex justify-center
                    border-b-2	border-gray-800 w-[20%] py-1 px-2 tracking-[10px]
                   text-xl text-gray-700 text-center
                   "
                        maxlength="4"
                        innerRef={refNumber3}
                        onKeyUp={() => {
                          inputFocusHandle(refNumber3);
                        }}
                      />
                      <Field
                        type="text"
                        name="number4"
                        className="bg-none flex justify-center
                    border-b-2	border-gray-800 w-[20%] py-1 px-2 tracking-[10px]
                   text-xl text-gray-700 text-center
                   "
                        maxlength="4"
                      />
                    </div>

                    <div className="mt-16 flex items-center justify-end  w-full">
                      <div className="w-[65%] flex items-center  ">
                        <label
                          htmlFor=""
                          className="w-[30%] pr-3 text-sm font-extrabold font-[bYekan] "
                        >
                          تاریخ انقضا :
                        </label>
                        <Field
                          type="text"
                          name="exp_month"
                          className="w-[25%]  py-2 px-2 text-center bg-gray-100 ml-2"
                          style={{ direction: "ltr" }}
                          maxlength="2"
                          placeholder="02"
                        />
                        <span className="text-2xl font-extrabold ">/</span>
                        <Field
                          type="text"
                          name="exp_year"
                          className=" w-[25%]  py-2 px-2 text-center bg-gray-100 mr-2	"
                          maxlength="4"
                          style={{ direction: "ltr" }}
                          placeholder="1402"
                        />
                      </div>

                      <div className="w-[40%] flex items-center justify-around">
                        <Field
                          type="text"
                          name="cvv2"
                          className="w-[50%] py-2 px-2 text-center bg-gray-100 mr-5"
                          maxlength="3"
                          style={{ direction: "ltr" }}
                          placeholder="111"
                        />
                        <label
                          htmlFor=""
                          className="flex w-[40%] text-sm font-extrabold mr-3 font-['tahoma']"
                        >
                          : CVV2
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" w-[60%] pt-3 font-[bYekan] ">
                  {errorName.map((err, index) => (
                    <ErrorMessage
                      key={index}
                      name={err}
                      render={(msg) => (
                        <div className="text-red-500 py-2 text-sm">{msg}</div>
                      )}
                    />
                  ))}
                </div>

                <div className="mt-10 w-[60%] flex justify-start  ">
                  <button
                    type="submit"
                    className="bg-slate-700 text-white py-3 w-32 shadow-md font-extrabold text-md flex 
                     justify-center font-[bYekan] "
                  >
                    ثبت
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
