import { logout } from "features/auth/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div className="flex min-h-screen">
      <div className="w-[15%] flex flex-col border py-14">
        <div className="py-10 flex justify-center items-center">{user}</div>
        <NavLink
          to="/home/list-cards"
          //   className={(isActive) =>
          //     isActive
          //       ? "bg-blue-100 py-3 flex justify-center"
          //       : " bg-white py-3 flex justify-center"
          //   }

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
          className="select bg-red-500 mt-10 cursor-pointer "
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          خروج
        </div>
      </div>
      <div className="w-[85%] border">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
