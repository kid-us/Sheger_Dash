import { useState } from "react";
import { tabs } from "./Sidebar";
import { Link } from "react-router-dom";

interface Props {
  active: string;
}

const SmallNavbar = ({ active }: Props) => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="lg:hidden md:hidden hero-bg z-10 flex justify-between sticky top-0 shadow p-4 bg">
        <Link to="/">
          <p className="text-black text-xl font-poppins">Shegerlace</p>
        </Link>
        <p
          onClick={() => setMenu(!menu)}
          className={`${menu ? "bi-x" : "bi-list"} text-black text-3xl`}
        ></p>
      </div>

      {menu && (
        <div className="fixed bg-main w-full z-50 h-[100dvh] bg">
          <div className="mt-10 md:text-center lg:text-start lg:ms-3 text-black px-5">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`${
                  active === tab.title
                    ? "bg-teal-300 rounded text-black"
                    : "text-black"
                } block mb-5 text-xl p-3 font-poppins`}
              >
                <span className={`${tab.icon} me-5`}></span>
                {tab.title}
              </Link>
            ))}
            <p className={`text-black block mb-5 lg:text-xl md:text-3xl p-3`}>
              <span className={`bi-box-arrow-right ps-1 text-xl`}></span>
              <span className={`lg:inline md:hidden text-xl ms-4 font-poppins`}>
                Logout
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallNavbar;
