import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../app/store";
import useAuth from "../hooks/useAuth";

const tabs = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Language",
];
export default function NavBar() {
  const { user, isLoading } = useSelector(
    (state: Rootstate) => state.user.value
  );

  const { logout } = useAuth();

  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-16 py-6 flex items-center ${
          showBackground ? "bg-black bg-opacity-90" : null
        }`}
      >
        <img
          className='h-7'
          src='https://logodownload.org/wp-content/uploads/2014/10/netflix-logo.png'
          alt='logo'
        />
        <div className='flex gap-7 ml-8 mr-auto'>
          {tabs.map((tab) => (
            <div
              key={tab}
              className='text-white hover:text-gray-300 cursor-pointer'
            >
              <p>{tab}</p>
            </div>
          ))}
        </div>
        {user && !isLoading && (
          <div>
            <div className='text-white hover:text-gray-300 cursor-pointer ml-auto'>
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
