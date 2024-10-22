import { useEffect, useState } from "react";
import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axios from "axios";
import baseUrl from "../../services/request";
import Confirmation from "../Modal/Confirmation";

interface General {
  all_orders: number;
  approved_orders: string;
  delivered_orders: string;
  pending_orders: string;
}

interface OrderItems {
  brand: string;
  category: string;
  main_picture: string;
  name: string;
  price: number;
  size_range: string;
  stock: number;
  uid: string;
  quantity: string;
  size: string;
}

interface OrderInfo {
  created_at: string;
  customer_id: number;
  customer_name: string;
  discount: number;
  discount_price: number;
  id: number;
  order_items: OrderItems[];
  promocode: string;
  status: string;
  total_price: number;
}

interface Orders {
  general: General;
  orders: OrderInfo[];
  has_next: boolean;
  has_prev: boolean;
  next_num: number | null;
  page: number;
  pages: number;
  prev_num: number | null;
  total: number;
}

interface OrdersTaps {
  id: number;
  name: string;
}

const taps: OrdersTaps[] = [
  { id: 2, name: "pending" },
  { id: 3, name: "approved" },
  { id: 4, name: "delivered" },
];

const Orders = () => {
  const [title] = useState("Orders");
  useDocumentTitle(title);

  const access_token = localStorage.getItem("token");

  const [active, setActive] = useState<string>("pending");
  const [option, setOption] = useState<boolean>(false);
  const [allData, setAllData] = useState<Orders>();
  const [selectedId, setSelectedId] = useState<number>();
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [deleteOrder, setDeleteOrder] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // Fetch orders
  useEffect(() => {
    axios
      .get<Orders>(`${baseUrl}admin/orders?page=${page}&status=${active}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setAllData(response.data);
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [active, page]);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Handle Status
  const handleStatus = (status: string) => {
    axios
      .put(
        `${baseUrl}admin/change-status?status=${status}&order_id=${selectedId}`,
        {},
        {
          headers: {
            "Content-Type": "application",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Delete Order */}
      {deleteOrder && selectedId && (
        <Confirmation
          name="Delete"
          info="rejected"
          id={selectedId.toString()}
          onDelete={() => {
            setOption(false);
            setSelectedId(0);
          }}
        />
      )}

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
          <div className="grid lg:grid-cols-9 grid-cols-3 gap-x-3 mb-10 flex-wrap">
            {taps.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.name)}
                className={`btn-bg rounded px-5 py-2 text-sm first-letter:uppercase ${
                  active === t.name
                    ? "bg-white shadow-inner shadow-black"
                    : "shadow shadow-zinc-900"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="lg:grid md:grid hidden lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-5 text-white rounded py-3 bg-gray-800 px-2">
            <div className="col-span-2">
              <p className="text-sm">Ordered By</p>
            </div>

            <div className="col-span-3">
              <p className="text-sm">Order Information</p>
            </div>

            <div className="col-span-2 ms-3">
              <p className="text-sm">Phone</p>
            </div>

            <div>
              <p className="text-sm">Total Price</p>
            </div>

            <div>
              <p className="text-sm">Date</p>
            </div>

            <div className="col-span-1"></div>
          </div>

          {/* Orders */}
          {orders.length > 0 ? (
            orders.map((o) => (
              <div
                key={o.id}
                className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-4 hero-bg text-black lg:px-2 md:px-2 px-4 pt-2 bg-white rounded shadow mb-2 border-b-2 border-gray-400 pb-3"
              >
                {/* Ordered By*/}
                <div className="col-span-2 rounded mt-3">
                  <p className="lg:hidden md:hidden text-xs text-gray-800 ">
                    Ordered By
                  </p>
                  <p className="font-bold">{o.customer_name}</p>
                </div>

                {/* Order Information */}
                <div className="col-span-3">
                  {o.order_items.map((item) => (
                    <div key={item.uid} className="grid grid-cols-6 gap-x-5">
                      <div className="col-span-3">
                        <img
                          src={item.main_picture}
                          alt="Shoes"
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Price</p>
                        <p>{item.price}</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Qty</p>
                        <p>{item.quantity}</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Size</p>
                        <p>{item.size}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phone*/}
                <div className="col-span-2 rounded mt-3 lg:ms-3">
                  <p className="lg:hidden md:hidden text-xs text-gray-800 ">
                    Phone
                  </p>
                  <p className="font-bold text-sm">0987654321</p>
                </div>

                {/* Total Price*/}
                <div className="col-span-2 rounded mt-3">
                  <p className="lg:hidden md:hidden text-xs text-gray-800 ">
                    Total Price
                  </p>
                  <p className="font-bold text-sm">{o.total_price}</p>
                </div>

                {/* Date*/}
                <div className="col-span-2 rounded mt-3">
                  <p className="lg:hidden md:hidden text-xs text-gray-800 ">
                    Date
                  </p>
                  <p className="font-bold text-sm">
                    {formatDate(o.created_at)}
                  </p>
                </div>

                {/* Edit */}
                <div className="justify-end relative lg:mt-0 mt-5 lg:col-span-1 col-span-2 ">
                  {option && selectedId === o.id && (
                    <div className="mt-7 me-2">
                      {active === "pending" && (
                        <button
                          onClick={() => handleStatus("approved")}
                          className="block text-sm mb-2 bg-yellow-500 rounded shadow shadow-zinc-900 p-1 text-white w-full"
                        >
                          Approved
                        </button>
                      )}
                      {active !== "delivered" ? (
                        <button
                          onClick={() => handleStatus("delivered")}
                          className="block text-sm mb-2 bg-green-500 rounded shadow shadow-zinc-900 p-1 text-white w-full"
                        >
                          Delivered
                        </button>
                      ) : (
                        ""
                      )}

                      <button
                        onClick={() => setDeleteOrder(true)}
                        className="block text-sm mb-2 bg-red-500 rounded shadow shadow-zinc-900 p-1 text-white w-full"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {option ? (
                    selectedId === o.id ? (
                      <p
                        onClick={() => {
                          setSelectedId(0);
                          setOption(false);
                        }}
                        className={`absolute top-0 right-0 bi-x-lg text-xl cursor-pointer h-10`}
                      ></p>
                    ) : (
                      <p
                        onClick={() => {
                          setSelectedId(o.id);
                          setOption(true);
                        }}
                        className={`absolute top-0 right-0 bi-three-dots-vertical text-xl cursor-pointer h-10`}
                      ></p>
                    )
                  ) : (
                    <p
                      onClick={() => {
                        setSelectedId(o.id);
                        setOption(true);
                      }}
                      className={`absolute top-0 right-0 bi-three-dots-vertical text-xl cursor-pointer h-10`}
                    ></p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="p-2 mt-2 text-center bg-white rounded text-sm">
              There are no active{" "}
              <span className="first-letter:uppercase font-bold">{active}</span>{" "}
              orders at the moment. Once you have any, they will be displayed
              here
            </p>
          )}

          {/* Pagination */}
          {orders.length >= 10 && (
            <div className="flex justify-end mt-2">
              <div className="flex gap-x-2">
                {/* prev */}
                <button
                  onClick={() =>
                    allData?.has_prev && setPage(allData ? page - 1 : 0)
                  }
                  disabled={allData?.has_prev === false ? true : false}
                  className={`${
                    allData?.has_prev === false
                      ? "bg-gray-400 cursor-not-allowed"
                      : "btn-bg"
                  } w-20 font-poppins rounded text-sm h-7`}
                >
                  Prev
                </button>
                {/* Current */}
                <p className="bg-white w-14 font-poppins rounded text-sm h-7 text-center pt-[6px]">
                  {allData?.page} of {allData?.pages}
                </p>
                {/*next  */}
                <button
                  onClick={() =>
                    allData?.has_next && setPage(allData ? page + 1 : 0)
                  }
                  disabled={allData?.has_next === false ? true : false}
                  className={`${
                    allData?.has_next === false
                      ? "bg-gray-400 cursor-not-allowed"
                      : "btn-bg"
                  } w-20 font-poppins rounded text-sm h-7`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
