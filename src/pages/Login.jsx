import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";


const Login = () => {
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name) {
      setMessage("Name is required");

      return false;
    }

    if (!password) {
      setMessage("Password is required");

      return false;
    } else if (password.length < 6) {
      setMessage("Password must be at least 6 characters");

      return false;
    }

    setMessage("");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.get(
          "https://66e7e68bb17821a9d9da6e50.mockapi.io/login"
        );

        if (response.data.length > 0) {
          const foundUser = response.data.find(
            (user) => user.name === name && user.password === password
          );

          if (foundUser) {
            setUser(foundUser);

            navigate("/Home");
          } else {
            setMessage("Invalid username or password");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

        setMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <section className="bg-[#bc9e80] h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-[#503d2a] rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Log In
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-300 "
                >
                  Your name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="name"
                  className="bg-white border border-gray-500 text-black rounded-lg focus:ring-[#FF9900] focus:border-[#FF9900] block w-full p-3"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  className="bg-white border border-gray-500 text-black rounded-lg focus:ring-[#FF9900] focus:border-[#FF9900] block w-full p-3"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="ml-3 text-sm"></div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#bc9e80]  font-medium rounded-lg text-sm px-5 py-3 text-center"
              >
                Log in
              </button>

              {message && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>

                  <span>{message}</span>
                </div>
              )}

              <p className="text-white">
                Don’t have an account yet?{" "}
                <Link
                  to="/"
                  className="font-medium text-[#bc9e80] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
