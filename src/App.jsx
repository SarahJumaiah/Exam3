import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";



const App = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name) {
      setMessage("Please provide your name");

      return false;
    }

    if (!email) {
      setMessage("Email address is required");

      return false;
    }

    if (!password) {
      setMessage("You must enter a password");

      return false;
    }

    if (password.length < 6) {
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
        const response = await axios.post("https://66e7e68bb17821a9d9da6e50.mockapi.io/login", {
          name,

          email,

          password,
        });

        localStorage.setItem("userdata", JSON.stringify(response.data));

        navigate("/login");
      } catch (error) {
        console.error("Error creating account:", error);
      }
    }
  };

  return (
    <section className="bg-[#bc9e80] h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-[#503d2a] rounded-lg p-8 space-y-6">
       
        <h1 className="text-3xl font-bold text-white">Create Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white text-black border border-gray-500 rounded-lg focus:ring-[#FF9900] focus:border-[#FF9900]"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white text-black border border-gray-500 rounded-lg focus:ring-[#FF9900] focus:border-[#FF9900]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white text-black border border-gray-500 rounded-lg focus:ring-[#FF9900] focus:border-[#FF9900]"
              placeholder="Create a strong password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#bc9e80] text-white p-3 rounded-lg"
          >
            Create Account
          </button>

          {message && <div className="text-red-500">{message}</div>}
        </form>

        <p className="text-white text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#bc9e80] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default App;
