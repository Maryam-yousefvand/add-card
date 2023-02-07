import { addCard, listCards, removeCard } from "features/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ListCards = () => {
  const listCard = useSelector((state) => state.auth.listCards);
  console.log(listCard);

  const [showRemoveCard, setShowRemoveCard] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(addCard());
  }, [dispatch]);

  return (
    <div className="w-full ">
      <div className="w-full min-h-screen flex items-center">
        <ul className="w-full border h-full">
          <li className="flex  justify-center py-3 border-b ">
            <div className="w-[19%]">نام کارت</div>
            <div className="w-[19%]">شماره کارت</div>
            <div className="w-[19%]">تاریخ انقضا </div>
            <div className="w-[19%]">cv2 </div>
            <div className="w-[19%]">حذف کارت </div>
          </li>

          {listCard &&
            listCard?.map((card, index) => (
              <li
                key={index}
                className="flex  justify-center py-7 odd:bg-blue-200 "
              >
                <div className="w-[19%]">{card?.name?.label}</div>
                <div className="w-[19%]">{card?.number}</div>

                <div className="w-[19%]">{card?.exp}</div>
                <div className="w-[19%]">{card?.cv2}</div>
                <div className="w-[19%]  ">
                  <div
                    className="flex w-28 justify-center py-2 bg-red-500 cursor-pointer shadow-md "
                    onClick={() => setShowRemoveCard(!showRemoveCard)}
                  >
                    حذف
                  </div>
                </div>

                {showRemoveCard ? (
                  <div className="w-full h-full top-0 right-0 bg-black   absolute flex justify-center items-center ">
                    <div className="w-[350px] h-[150px] border bg-white  ">
                      <p className="py-7">آیا از حذف کارت مطمئنید؟</p>
                      <div className="flex justify-evenly">
                        <div
                          className="bg-green-500 w-[40%] py-2 flex justify-center cursor-pointer"
                          onClick={() => {
                            dispatch(removeCard(index));
                            setShowRemoveCard(!showRemoveCard);
                          }}
                        >
                          بله
                        </div>
                        <div
                          className="bg-red-500 w-[40%] py-2 flex justify-center  cursor-pointer"
                          onClick={() => {
                            setShowRemoveCard(!showRemoveCard);
                          }}
                        >
                          خیر
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
