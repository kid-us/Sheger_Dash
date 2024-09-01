import { Link } from "react-router-dom";

interface Props {
  active: string;
}

export const tabs = [
  { id: 1, icon: "bi-speedometer", title: "Dashboard", path: "/" },
  { id: 2, icon: "bi-cloud-arrow-up-fill", title: "Upload", path: "/upload" },
  { id: 3, icon: "bi-gear-fill", title: "Setting", path: "/setting" },
];

const Sidebar = ({ active }: Props) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <>
      <div className="lg:block md:block hidden sticky top-0 h-[100dvh] lg:pe-3 bg2 px-2 pt-5 bg-zinc-800">
        <Link to="/">
          <h1 className="lg:text-2xl text-2xl md:text-center lg:text-start lg:ms-3">
            <span className="lg:block md:hidden block font-poppins text-white">
              Shegerlace
            </span>
            {/* <img src={icon} alt="logo" className="w-20 lg:hidden" /> */}
          </h1>
        </Link>
        <div className="mt-10 md:text-center lg:text-start lg:ms-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`${
                active === tab.title
                  ? "btn-bg rounded lg:text-black"
                  : "text-white"
              } block mb-5 lg:text-xl md:text-3xl p-2`}
            >
              <span className={`${tab.icon}`}></span>
              <span className={`lg:inline hidden lg:ms-5 font-poppins`}>
                {tab.title}
              </span>
            </Link>
          ))}

          <p
            onClick={handleLogout}
            className={`text-white block mb-5 lg:text-xl md:text-3xl p-2 cursor-pointer`}
          >
            <span className={`bi-box-arrow-right ps-1`}></span>
            <span className={`lg:inline hidden lg:ms-4 font-poppins`}>
              Logout
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
