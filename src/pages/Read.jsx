import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const Read = () => {
  const [Readitems, setReadItems] = useState([]);

  useEffect(() => {
    const fetchReadItems = async () => {
      const res = await fetch(
        "https://6707a6718e86a8d9e42c549f.mockapi.io/Read/"
      );

      const data = await res.json();

      setReadItems(data);
    };

    fetchReadItems();
  }, []);

  const deleteReadItem = async (id) => {
    try {
      await fetch(`https://668abf0d2c68eaf3211db654.mockapi.io/Read/${id}`, {
        method: "DELETE",
      });

      setReadItems(Readitems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting Read item:", error);
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wont be able to revert this!",
      icon: "warning",
      background: "#503d2a",
      showCancelButton: true,

      confirmButtonColor: "#bc9e80",

      cancelButtonColor: "#bc9e80",

      confirmButtonText: "Yes, delete it!",

      customClass: {
        title: "text-white",

        text: "text-gray-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReadItem(id);

        Swal.fire({
          title: "Deleted!",

          text: "Your book has been deleted.",

          icon: "success",

          background: "#503d2a",

          confirmButtonColor: "#bc9e80",
        });
      }
    });
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#bc9e80] h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Your Read books
        </h1>

        {Readitems.length === 0 ? (
          <p className="text-lg text-center text-white">Your Read is empty.</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {Readitems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 border-b border-gray-300"
              >
                <div className="flex items-center space-x-4 sm:w-2/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">
                      {item.title}
                    </h2>

                    <p className="text-gray-300">{item.author}</p>
                  </div>
                </div>

                <button
                  className="mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Read;
