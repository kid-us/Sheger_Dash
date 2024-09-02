import SmallNavbar from "../Dashboard/SmallNav";
import Sidebar from "../Dashboard/Sidebar";
import Nav from "../Dashboard/Nav";

import useStock from "../../hooks/useStock";

const Stock = () => {
  const { stock } = useStock();

  return (
    <>
      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Stock" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Stock" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 md:col-span-10 lg:p-8 p-3">
          {/* Nav */}
          <Nav />

          {/* Analytics */}
          <p className="text-black font-poppins my-5 text-xl">
            Available Shoes in stocks
          </p>

          <div className="grid grid-cols-4 gap-x-6">
            {stock.map((s) => (
              <div className="bg-white rounded shadow shadow-zinc-900">
                <img
                  src={s.main_picture}
                  alt="Shoes"
                  className="h-60 w-full object-contain"
                />
                <div className="flex justify-between px-3 py-2">
                  <button className="text-xl bi-trash-fill text-red-500"></button>
                  <button className="text-xl bi-pen-fill text-green-500"></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
