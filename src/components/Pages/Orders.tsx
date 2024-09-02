import { useState } from "react";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import { img } from "../../assets";

const Orders = () => {
  const [active, setActive] = useState<string>("all");
  const [option, setOption] = useState<boolean>(false);
  // const [selectedId, setSelectedId] = useState<string>("");

  return (
    <>
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Orders" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Orders" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 md:col-span-10 lg:p-8 p-3">
          {/* Nav */}
          <Nav />

          {/* Orders */}
          <p className="text-black font-poppins my-5 text-lg first-letter:uppercase">
            {active} Orders
          </p>

          {/* Taps */}
          <div className="flex gap-x-4 mb-10 flex-wrap">
            <button
              onClick={() => setActive("all")}
              className={`btn-bg rounded px-5 ${
                active === "all"
                  ? "bg-white shadow-inner shadow-black"
                  : "shadow shadow-zinc-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActive("pending")}
              className={`btn-bg rounded py-2 text-sm px-5 ${
                active === "pending"
                  ? "bg-white shadow-inner shadow-black"
                  : "shadow shadow-zinc-900"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActive("on-the-way")}
              className={`btn-bg rounded py-2 text-sm px-5 ${
                active === "on-the-way"
                  ? "bg-white shadow-inner shadow-black"
                  : "shadow shadow-zinc-900"
              }`}
            >
              On the Way
            </button>
            <button
              onClick={() => setActive("delivered")}
              className={`btn-bg rounded py-2 text-sm px-5 mt-3 ${
                active === "delivered"
                  ? "bg-white shadow-inner shadow-black"
                  : "shadow shadow-zinc-900"
              }`}
            >
              Delivered
            </button>
          </div>

          {/* Table */}
          <div className="lg:grid md:grid hidden lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-5 text-white rounded py-3 bg-gray-800 px-2">
            <div className="col-span-2">
              <p className="text-sm">Shoes</p>
            </div>

            <div>
              <p className="text-sm">Price</p>
            </div>

            <div>
              <p className="text-sm">Quantity</p>
            </div>

            <div>
              <p className="text-sm">Size</p>
            </div>

            <div className="col-span-2">
              <p className="text-sm">Transfer By</p>
            </div>

            <div className="col-span-2">
              <p className="text-sm">Transaction ID</p>
            </div>

            <div className="cols-span-2">
              <p className="text-sm">Date</p>
            </div>

            <div className="col-span-1"></div>
          </div>

          {/* Orders */}
          <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-4 gap-x-5 lg:gap-y-0 md:gap-y-0 gap-y-5 hero-bg text-black lg:px-2 md:px-2 px-4 pt-2 bg-white rounded shadow mb-3 border-b-2 border-gray-400 pb-3">
            {/* Shoes */}
            <div className="col-span-2 rounded">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Shoes</p>
              <img
                src={img}
                alt="shoes"
                className="h-28 w-full object-contain border rounded shadow"
              />
            </div>

            {/* Price */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Price:
              </p>
              <p className="text-sm font-bold">1234</p>
            </div>

            {/* Quantity */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Quantity
              </p>
              <p className="font-bold text-sm">2</p>
            </div>

            {/* Size */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Size</p>
              <p className="font-bold text-sm">40</p>
            </div>

            {/* Transfer By */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Transfer By
              </p>
              <p className="font-bold text-sm">Ethan</p>
            </div>

            {/* Date */}
            <div className="lg:hidden block">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Date</p>
              <p className="text-sm font-bold">3/4/2024</p>
            </div>

            {/* Transfer Id */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Txn Id
              </p>
              <p className="text-sm font-bold">RahbdX489df</p>
            </div>

            {/* Date */}
            <div className="lg:block hidden">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Date</p>
              <p className="text-sm font-bold">3/4/2024</p>
            </div>

            {/* Edit */}
            <div className="justify-end relative col-span-2">
              {option && (
                <>
                  <button className="block text-sm mb-2 bg-red-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    Delete
                  </button>
                  <button className="block text-sm mb-2 bg-yellow-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    On-the-way
                  </button>
                  <button className="block text-sm mb-2 bg-green-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    Delivered
                  </button>
                  <button className="block text-sm mb-2 bg-blue-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    Pending
                  </button>
                </>
              )}
              <p
                onClick={() => {
                  setOption(!option);
                  // setSelectedId("33");
                }}
                className={`absolute top-0 right-0 ${
                  option ? "bi-x-lg" : "bi-three-dots-vertical"
                } text-xl cursor-pointer h-10`}
              ></p>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-4 gap-x-5 lg:gap-y-0 md:gap-y-0 gap-y-5 hero-bg text-black lg:px-2 md:px-2 px-4 pt-2 bg-white rounded shadow mb-3 border-b-2 border-gray-400 pb-3">
            {/* Shoes */}
            <div className="col-span-2 rounded">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Shoes</p>
              <img
                src={img}
                alt="shoes"
                className="h-28 w-full object-contain border rounded shadow"
              />
            </div>

            {/* Price */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Price:
              </p>
              <p className="text-sm font-bold">1234</p>
            </div>

            {/* Quantity */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Quantity
              </p>
              <p className="font-bold text-sm">2</p>
            </div>

            {/* Size */}
            <div className="col-span-1">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Size</p>
              <p className="font-bold text-sm">40</p>
            </div>

            {/* Transfer By */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Transfer By
              </p>
              <p className="font-bold text-sm">Ethan</p>
            </div>

            {/* Date */}
            <div className="lg:hidden block">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Date</p>
              <p className="text-sm font-bold">3/4/2024</p>
            </div>

            {/* Transfer Id */}
            <div className="col-span-2">
              <p className="lg:hidden md:hidden text-xs text-gray-800">
                Txn Id
              </p>
              <p className="text-sm font-bold">RahbdX489df</p>
            </div>

            {/* Date */}
            <div className="lg:block hidden">
              <p className="lg:hidden md:hidden text-xs text-gray-800">Date</p>
              <p className="text-sm font-bold">3/4/2024</p>
            </div>

            {/* Edit */}
            <div className="justify-end relative col-span-2">
              {option && (
                <>
                  <button className="block text-sm mb-2 bg-red-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    Delete
                  </button>
                  <button className="block text-sm mb-2 bg-yellow-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    On-the-way
                  </button>
                  <button className="block text-sm mb-2 bg-green-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    Delivered
                  </button>
                  <button className="block text-sm mb-2 bg-blue-500 rounded shadow shadow-zinc-900 p-1 px-5 text-white">
                    Pending
                  </button>
                </>
              )}
              <p
                onClick={() => {
                  setOption(!option);
                  // setSelectedId("33");
                }}
                className={`absolute top-0 right-0 ${
                  option ? "bi-x-lg" : "bi-three-dots-vertical"
                } text-xl cursor-pointer h-10`}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
