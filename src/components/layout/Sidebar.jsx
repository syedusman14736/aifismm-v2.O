import Home from "/src/assets/icons/home.svg?react";
import Bar from "/src/assets/icons/bar.svg?react";
import Shop from "/src/assets/icons/shop.svg?react";
import Wallet from "/src/assets/icons/wallet.svg?react";
import Collapse from "/src/assets/icons/collapse.svg?react";
import Document from "/src/assets/icons/document.svg?react";
import { NavLink } from "react-router-dom";


function Sidebar() {

    return (
        <aside className="bg-[#F4F6F9] h-full px-2 py-3 border-r border-[#cdd0cf] flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-white font-medium text-[16px] text-center  bg-[#fa6c0a] w-full rounded border border-[#cdd0cf] py-1 px-3">A</h1>

                <span className="text-[#cdd0cf]">
                    <Bar />
                </span>


                <ul className="flex flex-col gap-2 items-center justify-center">
                    <NavLink to="/dashboard" end className={({ isActive }) =>
                        isActive ? "text-[#fa6c0a]  p-2 rounded-md cursor-pointer" : "text-[#57595a] p-2 rounded cursor-pointer"}>
                        <Home />
                    </NavLink>
                    <NavLink to="/dashboard/new-order" end className={({ isActive }) =>
                        isActive ? "text-[#fa6c0a]  p-2 rounded cursor-pointer" : "text-[#57595a] p-2 rounded-md cursor-pointer"}>
                        <Shop />
                    </NavLink>
                    <NavLink to="/dashboard/order-history" end className={({ isActive }) =>
                        isActive ? "text-[#fa6c0a]  p-2 rounded cursor-pointer" : "text-[#57595a] p-2 rounded-md cursor-pointer"}>
                        <Document />
                    </NavLink>
                    <NavLink to="/dashboard/add-funds" end className={({ isActive }) =>
                        isActive ? "text-[#fa6c0a]  p-2 rounded cursor-pointer" : "text-[#57595a] p-2 rounded-md cursor-pointer"}>
                        <Wallet />
                    </NavLink>

                </ul>

            </div>


            <div className="flex flex-col justify-center items-center">
                <li className="text-[#57595a] p-2 rounded-md cursor-pointer">
                    <Collapse />
                </li>
            </div>
        </aside >
    )
}

export default Sidebar