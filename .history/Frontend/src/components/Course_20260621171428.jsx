import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import api from "../axios/api";
import { Link, useLocation } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await api.get("/book");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, []);

  const filteredBooks = book.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>

          <p className="mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus accusamus accusantium sed architecto odio.
          </p>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {search && (
          <h2 className="mt-8 text-xl font-semibold">
            Search Results for:{" "}
            <span className="text-pink-500">{search}</span>
          </h2>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => (
              <Cards key={item._id || item.id} item={item} />
            ))
          ) : (
            <div className="col-span-4 text-center text-xl">
              No books found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;