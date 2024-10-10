import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Books = () => {
  const url =
    "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=VLORUfEBtZQ2zgbfPQWGzu8MH7RpOMoN";
  console.log(url);

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const filteredItems = items.filter((item) =>
        item.book_details[0].title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setItems(filteredItems);
    } else {
      fetchItems();
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=VLORUfEBtZQ2zgbfPQWGzu8MH7RpOMoN"
      );
      const data = await response.json();
      setItems(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-full bg-[#bc9e80]">
        <br />
        <br />
        <div className="flex justify-center gap-2">
          <input
            type="text"
            className="rounded-lg p-2 border border-gray-300 bg-white "
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleChange}
          />

          <button
            className="btn bg-[#503d2a] text-white px-4 py-2 rounded-lg"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 p-6 text-white">
          {items.length > 0 ? (
            items.map((item, id) => (
              <div key={id} className="card bg-[#38210a49] w-96 shadow-xl">
                <figure>
                  <img
                    src={item.book_details[0].book_image}
                    alt="book image"
                    className="w-full h-[40vh] object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{item.book_details[0].title}</h2>

                  <p>{item.book_details[0].author}</p>

                  <div className="card-actions justify-end">
                    <Link to={`/Iteminfo/${item.id}`}>
                      <button className="btn bg-[#503d2a] text-white">
                        Book Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books found.</p>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Books;
