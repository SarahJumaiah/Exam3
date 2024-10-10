import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Iteminfo = () => {
  let { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VLORUfEBtZQ2zgbfPQWGzu8MH7RpOMoN"
        );
        const data = await res.json();
        const selectedItem = data.results.books.find((book) => book.rank === parseInt(id));
        setItem(selectedItem);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const Favbook = async () => {
    try {
      await fetch(
        `https://6707a6718e86a8d9e42c549f.mockapi.io/Fav`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: item.title,
            image: item.book_image,
            author: item.author,
            link: item.amazon_product_url,
          }),
        }
      );
      navigate("/Fav");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const Readbook = async () => {
    try {
      await fetch(
        `https://67036af4bd7c8c1ccd4156a5.mockapi.io/Read`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: item.title,
            image: item.book_image,
            author: item.author,
            link: item.amazon_product_url,
          }),
        }
      );
      navigate("/Read");
    } catch (error) {
      console.error("Error adding to read books:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-3 p-4 h-screen bg-[#bc9e80]">
        {loading ? (
          <p>Loading…</p>
        ) : item ? (
          <div className="card bg-[#503d2a] w-[40vw] max-sm:w-[80vw] shadow-xl">
            <figure>
              <img
                src={item.book_image}
                alt={item.title}
                className="w-full h-[50vh] max-sm:h-[20vh] object-cover"
              />
            </figure>
            <div className="card-body text-white">
              <h2 className="card-title text-white">{item.title}</h2>
              <p className="font-bold">About this Book:</p>
              <div className="card-actions justify-center mt-5">
                <button className="btn bg-[#bc9e80] btn-lg text-white" onClick={Favbook}>
                  Fav
                </button>
                <button className="btn bg-[#bc9e80] btn-lg text-white" onClick={Readbook}>
                  Read
                </button>
                <Link to="/Books">
                  <button className="btn bg-[#bc9e80] btn-lg text-white">Back</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Item not found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Iteminfo;
