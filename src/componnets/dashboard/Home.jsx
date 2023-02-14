import { logout } from "features/auth/authSlice";
import React from "react";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="flex min-h-screen relative ">
      <div className="xs:w-[20%] lg:w-[15%] flex flex-col  py-14 bg-slate-800 shadow-lg font-[bYekan] ">
        <div className="py-10 flex flex-col justify-center items-center ">
          <div className="font-[bYekan]">
            <IconContext.Provider
              value={{ size: "", color: "", className: "text-8xl text-white" }}
            >
              <HiUserCircle />
            </IconContext.Provider>
          </div>
          <div className="text-white">{`${token?.user?.first_name} ${token?.user?.last_name} `}</div>
        </div>
        <NavLink
          to="/home/list-cards"
          className={({ isActive }) => (isActive ? "select" : " unselect")}
        >
          لیست کارت ها
        </NavLink>
        <NavLink
          to="/home/add-card"
          className={({ isActive }) => (isActive ? "select" : " unselect")}
        >
          ثبت کارت
        </NavLink>
        <div
          className="flex justify-center font-extrabold text-lg items-center text-red-500 mt-10 cursor-pointer "
          onClick={() => {
            dispatch(logout(navigate));
            navigate("/");
          }}
        >
          <IconContext.Provider
            value={{ size: "", color: "", className: "text-4xl pl-2" }}
          >
            <BiLogOut />
          </IconContext.Provider>
          خروج
        </div>
      </div>
      <div className="xs:w-[80%] lg:w-[85%]  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
