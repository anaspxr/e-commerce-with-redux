import Item from "../components/Item";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import axiosErrorCatch from "../utils/axiosErrorCatch";
import LoadingAndError from "../components/LoadingAndError";

export default function SearchResults() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const { query } = useParams();

  useEffect(() => {
    const asyncSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`/public/search?query=${query}`);
        if (data) setResults(data);
      } catch (error) {
        setError(axiosErrorCatch(error));
        toast.error("Something went wrong, please try again later..");
      } finally {
        setLoading(false);
      }
    };
    asyncSearch();
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl text-orange-900 py-5 text-center">
        Search Results for &quot;{query}&quot;
      </h2>
      <LoadingAndError loading={loading} error={error} />
      {!loading && results && (
        <div className="p-2 sm:p-3 lg:p-5 pb-10 ">
          {results.length === 0 && (
            <h1 className="text-xl text-orange-900 my-5 text-center">
              No results found
            </h1>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            {results.map((item) => (
              <Item key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
