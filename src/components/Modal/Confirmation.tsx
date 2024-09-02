import axios from "axios";
import { useState } from "react";
import baseUrl from "../../services/request";

interface Props {
  onDelete: (value: boolean) => void;
  id: string;
  name: string;
}

const Confirmation = ({ onDelete, name, id }: Props) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    axios
      .delete(`${baseUrl}store/delete-shoe?shoe_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setConfirmed(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="overlay w-full z-50"></div>
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="py-6 px-8 bg rounded lg:w-[30%] lg:mx-0 mx-3">
            {!confirmed ? (
              <>
                <h1 className="text-xl ">{name}</h1>
                <p className="text-sm my-5 font-poppins">
                  Are you sure you want to delete the product? This action
                  cannot be undone. Do you want to proceed
                </p>
                <div className="flex justify-between gap-x-10">
                  <button
                    onClick={() => onDelete(false)}
                    className="w-full bg-sky-600 rounded text-white h-12 font-poppins shadow shadow-zinc-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirm()}
                    className={`w-full bg-red-500 shadow shadow-zinc-900 rounded text-white h-12 font-poppins`}
                  >
                    {name === "Happy" ? "Create" : name}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="bi-check-circle-fill text-green-500 text-4xl"></p>
                <p className="text-black mt-5 text-xl font-poppins first-letter:uppercase">
                  Product deleted successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
