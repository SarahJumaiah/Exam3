import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaBook} from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userdata");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userdata");

    navigate("/Home");
  };

  return (
    <nav className="bg-[#503d2a] text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/Home">
          <div>
            <svg
              fill="#ffffff"
              height="50"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <rect x="48.02" y="147.407" width="30.431" height="256.816" />
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="146.281"
                    y="100.696"
                    width="44.365"
                    height="30.431"
                  />
                </g>
              </g>
              <g>
                <g>
                  <rect x="146.281" y="142.68" width="44.365" height="30.431" />
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="255.548"
                    y="339.334"
                    width="63.448"
                    height="30.431"
                  />
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="255.548"
                    y="381.329"
                    width="63.448"
                    height="30.431"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M447.308,115.809l-83.242,16.558V81.096H240.895V48.204H96.041v39.638H0v375.955h96.041h30.431h83.992h30.431h123.171
			V282.813l35.905,180.511L512,441.039L447.308,115.809z M96.041,433.366h-65.61V118.273h65.61V433.366z M210.464,433.366h-83.992
			V225.6h83.992V433.366z M210.464,81.096v114.073h-83.992V87.842v-9.207h83.992V81.096z M333.636,433.366h-92.74V111.527h92.74
			V433.366z M423.881,427.54l-52.819-265.538l11.245-2.237l52.819,265.538L423.881,427.54z M412.153,153.829l11.245-2.237
			l52.82,265.538l-11.246,2.237L412.153,153.829z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </Link>
        <h1 className="ml-2 text-2xl font-semibold"> Library</h1>

        <div className="flex-grow mx-4"></div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-sm font-light">
              Hello,{" "}
              <span className="font-semibold">{user ? user.name : "User"}</span>
            </p>
          </div>

          <div className="relative flex space-x-4">
            <Link to="/Fav">
              <FaHeart className="h-8 w-8 text-[#bc9e80] transition-colors duration-300" /> Favorites
            </Link>
            <Link to="/Read">
              <FaBook className="h-8 w-8 text-[#bc9e80] transition-colors duration-300" /> Read
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={logout}
              className="bg-[#bc9e80] text-white py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
