import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Category from "../Categories/Category";
import Brands from "../Brands/Brands";
import Promo from "../Promo/Promo";
import axios from "axios";
import baseUrl from "../../services/request";
import { Link } from "react-router-dom";

interface StockShoes {
  id: number;
  brand: string;
  category: string;
  main_picture: string;
  name: string;
  images: string[];
  price: number;
  size_range: string;
  stock: string;
  uid: string;
  description: string;
}

interface AllShoes {
  shoes: StockShoes[];
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  next_num: number | null;
  prev_num: number | null;
  total_pages: number;
  total_product: number;
}

const Home = () => {
  const [title] = useState<string>("Shegerlace | Dashboard");
  useDocumentTitle(title);

  const [allData, setAllData] = useState<AllShoes>();
  const [stock, setStock] = useState<StockShoes[]>([]);
  const [page, setPage] = useState<number>(1);

  const access_token = localStorage.getItem("token");

  // Get out of stock items.
  useEffect(() => {
    axios
      .get<AllShoes>(`${baseUrl}admin/out-of-stock?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setAllData(response.data);
        setStock(response.data.shoes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <>
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Dashboard" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Dashboard" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 md:col-span-10 lg:p-8 p-3">
          {/* Nav */}
          <Nav />
          {/* Out of Stock Shoes */}
          <p className="text-black font-poppins my-4 font-bold text-lg">
            Out of stock Items
          </p>
          <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-5">
              {stock.map((s) => (
                <div
                  key={s.id}
                  className="relative grid grid-cols-2 bg-white rounded p-2 shadow lg:mb-0 mb-3"
                >
                  <img src={s.main_picture} alt="Shoes" className="w-32" />
                  <div className="mt-10">
                    <p>{s.name}</p>
                    <p>Remaining in stock {s.stock} </p>

                    <div className="absolute bottom-0">
                      <Link to={"/stock"} className="text-blue-600">
                        {" "}
                        Edit{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {stock.length >= 10 && (
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
                    {allData?.current_page} of {allData?.total_pages}
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

          {/* Analytics */}
          <div className="lg:grid grid-cols-3 gap-x-10 mt-4">
            <Category />
            <Brands />
            <Promo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
