import Item from "../components/Item";
import { useParams } from "react-router-dom";
import getSearchResults from "../utils/getSearchResults";
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export default function SearchResults() {
  const { products, loading, error } = useContext(ProductContext);
  const { query } = useParams();
  const results = getSearchResults(products || [], query, ["name", "category"]);
  return (
    <div>
      <h2 className="md:text-4xl text-3xl text-orange-900 py-5 text-center">
        Search Results
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {products && (
        <div className="p-2 sm:p-3 lg:p-5 pb-10 ">
          {results.length === 0 && (
            <h1 className="text-xl text-orange-900 my-5 text-center">
              No results found
            </h1>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            {results.map((item) => (
              <Item key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
