import { Link } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import avatarImage from "../assets/avatar.png";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { store } from "../redux/store";

type RootState = ReturnType<typeof store.getState>;

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    }
    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
  ];

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiOutlineBars3BottomLeft className="size-6" />
          </Link>
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-slate-100 w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div
          ref={dropdownRef}
          className="relative flex items-center md:space-x-3 space-x-2"
        >
          <div>
            {currentUser ? (
              <button
                onClick={() => {
                  setIsDropDownOpen(!isDropDownOpen);
                }}
              >
                <img
                  src={avatarImage}
                  alt=""
                  className={`size-7 rounded-full ${
                    currentUser ? "ring-2 ring-blue-500" : ""
                  }`}
                />
              </button>
            ) : (
              <Link to="/login">
                <FaUser className="size-6" />
              </Link>
            )}
            {isDropDownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-1g rounded-md z-40">
                <ul className="py-2">
                  {navigation.map((item) => (
                    <li
                      key={item.name}
                      onClick={() => setIsDropDownOpen(false)}
                    >
                      <Link
                        to={item.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button className="hidden sm:block">
            <FaRegHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <CiShoppingCart className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
