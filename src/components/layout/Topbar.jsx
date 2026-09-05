import User from "/src/assets/icons/user.svg?react";
import Notification from "/src/assets/icons/notification.svg?react";
import Slash from "/src/assets/icons/slash.svg?react";

function Topbar() {
    return (
        <header className="bg-white px-4 py-3 border-b border-[#cdd0cf] flex justify-between items-center">
            <div className="flex gap-1 items-center justify-center">
                <h1 className="text-[#252525] font-medium text-[16px]">AiFi SMM</h1>
                <span className="text-[#57595a]">
                    <Slash />
                </span>
                <h1 className="text-[#fa6c0a] font-medium text-[16px]">Dashboard</h1>
            </div>
            <div className="flex">
                <ul className="flex items-center justify-center gap-2">
                    <li className="text-[#57595a] p-2 rounded-md border border-[#cdd0cf] cursor-pointer">
                        <Notification />
                    </li>
                    <li className="text-white bg-[#29245d] p-2 rounded-full border border-[#57595a] cursor-pointer">
                        <User />
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Topbar