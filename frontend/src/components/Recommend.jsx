import { useEffect, useState } from "react";
import Item from "./Item";
import useFetch from "../utils/useFetch";
import LoadingAndError from "./LoadingAndError";

export function RelatedProducts({ product }) {
  const { data, loading, error } = useFetch("/public/products");
  return (
    <>
      <LoadingAndError loading={loading} error={error} />
      {data?.products && (
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-2 sm:gap-4 mt-5">
          {data.products
            .filter((item) => item.category === product.category)
            .slice(0, 4)
            .map((item) => (
              <Item key={item.id} product={item} />
            ))}
        </div>
      )}
    </>
  );
}

export function Recommend() {
  const [randomItems, setRandomItems] = useState([]);
  const { data, loading, error } = useFetch("/public/products");

  useEffect(() => {
    //? Get 4 random items from the products data
    if (!data) return;
    const getRandomItems = () => {
      const shuffledItems = data.products
        ? data.products.sort(() => 0.5 - Math.random())
        : [];
      const selectedItems = shuffledItems.slice(0, 4);
      setRandomItems(selectedItems);
    };
    getRandomItems();
  }, [data]);

  return (
    //? Display the 4 random items

    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {randomItems.map((item) => (
        <Item key={item._id} product={item} />
      ))}
    </div>
  );
}
