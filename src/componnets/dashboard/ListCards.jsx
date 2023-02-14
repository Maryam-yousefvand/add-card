import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, getListCards } from "features/card/cardSlice";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

import Loader from "./Loader";

export const ListCards = () => {
  const dispatch = useDispatch();
  const listCards = useSelector((state) => state.card.listCards);
  const isLoading = useSelector((state) => state.card.loading);

  const [showMenuCard, setShowMenuCard] = useState([]);

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [cardId, setCardId] = useState();

  const [cards, setCards] = useState(listCards.slice(0, 12));
  const [pageNumber, setPageNumber] = useState(0);
  const cardsPerPage = 4;
  const pagesVisited = pageNumber * cardsPerPage;

  const pageCount = Math.ceil(cards.length / cardsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setCards(listCards.slice(0, listCards?.length));
  }, [listCards]);

  const showMenuHandle = (index) => {
    const up = [...showMenuCard];
    up.splice(index - 1, 1, !showMenuCard[index - 1]);
    setShowMenuCard(up);
  };

  useEffect(() => {
    dispatch(getListCards());
  }, [dispatch]);
  useEffect(() => {
    let show = [];
    show = listCards.map((item) => (item = false));

    setShowMenuCard(show);
  }, [listCards]);

  const handleCopy = async (card) => {
    try {
      await navigator.clipboard.writeText(
        `${card?.number1} ${card?.number2} ${card?.number3} ${card?.number4}`
      );

      toast.success("کپی شد!", {
        position: "bottom-center",
        style: { direction: "rtl", fontFamily: "bYekan" },
      });
    } catch (err) {
      toast.error("کپی نشد!", {
        position: "bottom-center",
        style: { direction: "rtl", fontFamily: "bYekan" },
      });
    }
  };

  const displayCards = cards
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((card) => {
      return (
        <li
          key={card?.id}
          className="mini:w-[90%] lg:w-[40%] mb-10 h-60 bg-gradient-to-l from-blue-200
           via-gray-400 to-gray-200
                 shadow-lg rounded-2xl "
        >
          <div className="flex justify-between items-center px-5 py-5 ">
            <div className="font-[bYekan]">{`بانک ${card?.bankName}`} </div>

            <div
              className=" rounded-lg flex justify-center 
                      items-center bg-gray-400 opacity-60  shadow-sm
                      cursor-pointer "
            >
              {showMenuCard && showMenuCard?.[card?.id - 1] === true ? (
                <ul className="flex items-center">
                  <li className="flex  ">
                    <button
                      className="text-[11px] bg-green-700 ml-2 text-white rounded-sm px-2 py-1 font-[bYekan]"
                      onClick={() => {
                        handleCopy(card);
                      }}
                    >
                      کپی کارت
                    </button>
                  </li>
                  <li className=" flex">
                    <button
                      className="text-[11px] bg-red-700  text-white rounded-sm px-2 py-1 font-[bYekan]"
                      onClick={() => {
                        setShowDeleteCard(true);
                        setCardId(card?.id);
                      }}
                    >
                      حذف کارت
                    </button>
                  </li>
                </ul>
              ) : null}

              <div
                className=" text-xl font-extrabold tracking-[2.5px] text-white h-9 w-11 flex 
                    justify-center"
                onClick={() => showMenuHandle(card?.id)}
              >
                ...
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full  ">
            <div className="flex w-[100%] flex-row-reverse justify-around  py-7">
              <div className="text-black text-lg font-extrabold ">
                {card?.number1}
              </div>
              <div className="text-black text-lg font-extrabold ">
                {card?.number2}
              </div>
              <div className="text-black text-lg font-extrabold ">
                {card?.number3}
              </div>
              <div className="text-black text-lg font-extrabold ">
                {card?.number4}
              </div>
            </div>
          </div>
          <div className="flex justify-around w-full  py-5">
            <div className="flex justify-around w-[84%]  ">
              <div className=" w-[50%]">
                <p className=" text-sm">
                  <span className="font-extrabold font-[bYekan] ">
                    {" "}
                    تاریخ انقضا :{" "}
                  </span>
                  <span className="mr-2 font-bold ">{`  ${card?.exp_month} / ${card?.exp_year}`}</span>
                </p>
              </div>
              <div className=" flex justify-end w-[50%]">
                <p className=" text-sm">
                  <span className="font-extrabold"> cvv2 :</span>
                  <span className="ml-3 font-bold ">{card?.cvv2}</span>
                </p>
              </div>
            </div>
          </div>
        </li>
      );
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full py-32 ">
      <p className="pr-14 text-slate-800 text-3xl font-extrabold font-[bYekan]">
        لیست کارت ها
      </p>
      <div className="w-full min-h-screen flex justify-center items-center">
        <ul className=" flex justify-between flex-wrap w-[75%]  ">
          {displayCards}
        </ul>
      </div>
      <ReactPaginate
        previousLabel={`>`}
        nextLabel={"<"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      {showDeleteCard ? (
        <div className="absolute top-0 right-0 bg-black bg-opacity-5 w-full h-full font-[bYekan]">
          <div className="flex h-[70%] min-h-screen  justify-center items-center">
            <div className="w-[350px] h-[200px] bg-white rounded-lg shadow-lg ">
              <p className="py-5 pt-10 text-center font-extrabold text-md ">
                آیا از حذف کارت اطمینان دارید؟
              </p>
              <div className="w-[70%] flex justify-around m-auto pt-7">
                <button
                  className="w-20 py-1 bg-green-600 text-white font-extrabold text-sm shadow-md"
                  onClick={() => {
                    dispatch(
                      deleteCard({ cardId, setShowDeleteCard, dispatch })
                    );
                  }}
                >
                  بله
                </button>
                <button
                  className="w-20 py-1 bg-red-500 text-white font-extrabold text-sm shadow-md"
                  onClick={() => setShowDeleteCard(false)}
                >
                  خیر
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
