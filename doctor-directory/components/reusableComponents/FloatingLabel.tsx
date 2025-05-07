import { useState, ChangeEvent } from "react";
import Image from "next/image";
// import { useTranslations } from "next-intl";

interface FloatingLabelProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMgs?: string;
  switchShowPAss?: () => void;
  showEye?: boolean;
}

const FloatingLabel = ({
  label,
  name,
  type,
  value,
  onChange,
  errorMgs,
  switchShowPAss,
  showEye,
}: FloatingLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative mt-[30px] w-full">
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 pl-70 duration-500"
        style={{ marginBottom: errorMgs ? "5px" : "0" }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        className={`absolute ${
          isFocused || value ? "top-[-20%]" : "top-2"
        } left-0 mx-2 transition-all duration-300 ease-in-out bg-white ${
          isFocused || value
            ? "text-indigo-500 text-xs"
            : "text-gray-500 text-base"
        }`}
        htmlFor={name}
      >
        {label}
      </label>

      {type === "password" && showEye ? (
        <Image
          className="absolute top-[25%]  right-2"
          src="/assets/icons/closedeye.svg"
          width={20}
          height={20}
          alt={`eye-toggle-${name}`}
          onClick={switchShowPAss}
        />
      ) : (
        type === "text" &&
        showEye && (
          <Image
            className="absolute top-[25%]  right-2"
            src="/assets/icons/openeye.svg"
            width={20}
            height={20}
            alt={`eye-toggle-${name}`}
            onClick={switchShowPAss}
          />
        )
      )}

      {errorMgs && (
        <p
          className="absolute top-[100%] opacity-0 text-red-500 text-xs mt-1 duration-500"
          style={{ opacity: errorMgs ? "1" : "0" }}
        >
          {errorMgs}
        </p>
      )}
    </div>
  );
};

export default FloatingLabel;
