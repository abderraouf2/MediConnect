import React from "react";

const MyButton = ({ backgroundColor, label, submitInputs }: any) => {
  return (
    <button
      className={`w-full hover:bg-${backgroundColor}-500 text-white mt-[20px] font-bold py-2 px-4 rounded-full`}
      style={{ transition: "all .15s ease", backgroundColor: backgroundColor }}
      onClick={submitInputs}
    >
      {label}
    </button>
  );
};

export default MyButton;
