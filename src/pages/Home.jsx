
import { Link} from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Home() {
  return (
    <>
    <Navbar/>
    <div className="bg-[#bc9e80] h-screen flex items-center justify-center">
        <div className="w-full  flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-white font-bold text-center text-4xl">Welcome to Our Library!</h1> <br />
     <button> <Link to="/Books" className="bg-[#503d2a] text-white py-2 px-4 rounded-lg transition-colors duration-300 ">
        View Books
      </Link> </button>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default Home;
