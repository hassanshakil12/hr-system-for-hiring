import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-4">
      {/* Notification Icon */}
      {/* <Link to="/notification-user">
        <span className="overflow-hidden h-11 w-11 cursor-pointer flex items-center justify-center">
          <img
            src="/images/notification-icon.png"
            alt="Notification"
            className="h-8 w-8"
          />
        </span>
      </Link> */}

      {/* User Avatar */}
      <div>
        <div
          onClick={() => setOpen(!open)}
          className="overflow-hidden rounded-full h-11 w-11 cursor-pointer flex items-center justify-center bg-white"
        >
          <img
            src="/images/profile_img.svg"
            alt="User"
            className="h-11 w-11 object-cover"
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-20">
            <Link
              to="/candidate-profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/candidate-logout"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
