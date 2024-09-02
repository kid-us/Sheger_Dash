import Nav from "../Dashboard/Nav";
import Sidebar from "../Dashboard/Sidebar";
import SmallNavbar from "../Dashboard/SmallNav";
import { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Category from "../Categories/Category";
import Brands from "../Brands/Brands";

const Home = () => {
  const [title] = useState<string>("Zusebingo | Dashboard");
  useDocumentTitle(title);
  // const [loader, setLoader] = useState<boolean>(false);

  // const access_token = localStorage.getItem("token");

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

          {/* Analytics */}
          <p className="text-black font-poppins my-8">Analytics</p>
          <div
            className="lg:flex gap-x-14
          "
          >
            <Category />
            <Brands />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
