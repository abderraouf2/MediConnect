import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setUser } = useContext(UserContext); // Get the user's name from context

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/api/patients/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    window.location.reload();
    if (data.message === "Logged out successfully") {
      setUser(null);
    }
  };

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="py-2"
        type="button"
        onClick={toggleDropdown}
      >
        {/* Placeholder icon (replace with your own user icon) */}
        <IoIosArrowDown />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownAvatarName"
          className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44"
        >
          <ul className="py-2 text-sm text-gray-700 ">
            {/* Sign out button */}
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleSignOut}
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
