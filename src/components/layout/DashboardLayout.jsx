
import RevenueChart from "../charts/RevenueChart";
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import Arrow from "/src/assets/icons/arrow.svg?react";

function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="h-full flex min-w-0   flex-1  flex-col justify-between">
        <Topbar />
        <main className="hide-scrollbar h-screen flex flex-col  overflow-y-auto px-4 py-3">
          <div className="leading-5.5">
            <h1 className="text-[18px] text-[#252525] font-medium">Hey, Usman 👋</h1>
            <p className="text-xs text-[#57595a]">Monday, 20 August 2026</p>
          </div>

          <div className="grid grid-cols-4 gap-4 my-3">

            <div className="rounded-md border border-[#cdd0cf]">
              <div className=" flex flex-col gap-1 px-4 py-3">
                <div>
                  <p className="text-xs text-[#57595a]">Username</p>
                </div>
                <h1 className="text-xl font-medium text-[#252525]"><span className="text-[16px]">@</span>aifismm</h1>
              </div>

              <div className="flex justify-between items-center bg-[#F4F6F9] px-4 cursor-pointer py-2 rounded-b-md border-t border-[#cdd0cf]">
                <p className="text-xs text-[#252525] w-full">View Profile</p>
                <span className="text-[#57595a]">
                  <Arrow />
                </span>
              </div>
            </div>

            <div className="rounded-md border border-[#cdd0cf]">
              <div className="flex flex-col gap-1 px-4 py-3">
                <div>
                  <p className="text-xs text-[#57595a]">Total Orders</p>
                </div>
                <h1 className="text-xl font-medium text-[#252525]">3950</h1>
              </div>

              <div className="flex justify-between items-center  cursor-pointer bg-[#F4F6F9] px-4 py-2 rounded-b-md border-t border-[#cdd0cf]">
                <p className="text-xs text-[#252525] w-full">View Order History</p>
                <span className="text-[#57595a]">
                  <Arrow />
                </span>
              </div>
            </div>

            <div className="rounded-md border border-[#cdd0cf]">
              <div className=" flex flex-col gap-1 px-4 py-3">
                <div>
                  <p className="text-xs text-[#57595a]">Current Balance</p>
                </div>
                <h1 className="text-xl font-medium text-[#252525]">PKR 2440</h1>
              </div>

              <div className="flex justify-between items-center bg-[#F4F6F9] cursor-pointer px-4 py-2 rounded-b-md border-t border-[#cdd0cf]">
                <p className="text-xs text-[#252525] w-full">Add more Balance</p>
                <span className="text-[#57595a]">
                  <Arrow />
                </span>
              </div>
            </div>

            <div className="rounded-md border border-[#cdd0cf]">
              <div className="flex flex-col gap-1 px-4 py-3">
                <div>
                  <p className="text-xs text-[#57595a]">Total Spent</p>
                </div>
                <h1 className="text-xl font-medium text-[#252525]">PKR 87.9K</h1>
              </div>

              <div className="flex justify-between items-center bg-[#F4F6F9] cursor-pointer px-4 py-2 rounded-b-md border-t border-[#cdd0cf]">
                <p className="text-xs text-[#252525] w-full">Place New Order</p>
                <span className="text-[#57595a]">
                  <Arrow />
                </span>
              </div>
            </div>

          </div>

          {/* <OrderWizard /> */}
          <RevenueChart />

        </main>
        {/* <Footer /> */}
      </div>


    </div>
  )
}

export default DashboardLayout