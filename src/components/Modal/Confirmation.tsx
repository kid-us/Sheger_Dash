import socket from "@/socket";
import { useState } from "react";

interface Props {
  onDelete: (value: boolean) => void;
  name: string;
  bonus?: string;
  minute?: string;
}

const Confirmation = ({ onDelete, name, bonus, minute }: Props) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    // Terminate Name
    if (name === "Terminate") {
      socket.emit("terminate_jkt", (response: boolean) => {
        if (response) {
          setConfirmed(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    }

    // Happy Hour
    if (name === "Happy") {
      const happy = {
        bonus: bonus,
        duration: minute,
      };
      socket.emit("set_bonus", happy, () => {
        setConfirmed(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    }

    // Jackpot Start
    if (name === "Start") {
      setConfirmed(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      socket.emit("start_jackpot_game", () => {});
    }
  };

  return (
    <>
      <div className="overlay w-full z-50"></div>
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="py-6 px-8 bg rounded lg:w-[30%] lg:mx-0 mx-3">
            {!confirmed ? (
              <>
                <h1 className="text-white text-xl ">{name}</h1>
                <p className="text-sm  text-gray-300 my-5 font-poppins">
                  {name === "Terminate"
                    ? "Are you sure you want to terminate jackpot? This action cannot be undone. Do you want to proceed?"
                    : name === "Start"
                    ? "Are you sure you want to start the jackpot? Do you want to proceed?"
                    : "Are you sure you want to create a happy hour? Do you want to proceed?"}
                </p>
                <div className="flex justify-between gap-x-10">
                  <button
                    onClick={() => onDelete(false)}
                    className="w-full bg-sky-600 rounded text-white shadow-none h-12 font-poppins"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirm()}
                    className={`w-full ${
                      name === "Terminate" ? "bg-red-500" : "bg-green-600"
                    } rounded text-white shadow-none h-12 font-poppins`}
                  >
                    {name === "Happy" ? "Create" : name}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="bi-check-circle-fill text-green-500 text-4xl"></p>
                <p className="text-white mt-5 text-xl font-poppins first-letter:uppercase">
                  {name === "Terminate" && "Jackpot terminated successfully!"}
                  {name === "Happy" && "Happy hour created successfully!"}
                  {name === "Start" && "Jackpot started successfully!"}
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
