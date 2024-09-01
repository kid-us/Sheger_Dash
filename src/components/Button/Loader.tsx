import "./loader.css";

const Loader = () => {
  return (
    <p className="py-6 text-black btn-bg w-full rounded flex justify-center font-poppins text-lg shadow shadow-zinc-950">
      <span className="loader rounded"></span>
    </p>
  );
};

export default Loader;
