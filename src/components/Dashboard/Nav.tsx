const Nav = () => {
  // const { username } = useAuth();

  return (
    <>
      <div className="lg:flex md:flex hidden justify-between border-b border-gray-400 pb-5">
        <div className="relative">
          <div className="">
            <p className="font-poppins text-xl">
              Welcome back
              <span className="text-teal-400 font-poppins mx-2 font-bold uppercase">
                {"username"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
