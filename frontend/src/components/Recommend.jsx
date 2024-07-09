import { useContext, useEffect, useState } from "react";
import Item from "./Item";
import { ProductContext } from "../contexts/ProductContext";

export function RelatedProducts({ product }) {
  const { products, loading, error } = useContext(ProductContext);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {products && (
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-2 sm:gap-4 mt-5">
          {products
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
  const { products, loading, error } = useContext(ProductContext);

  useEffect(() => {
    //? Get 4 random items from the products data
    const getRandomItems = () => {
      const shuffledItems = products
        ? products.sort(() => 0.5 - Math.random())
        : [];
      const selectedItems = shuffledItems.slice(0, 4);
      setRandomItems(selectedItems);
    };
    getRandomItems();
  }, [products]);

  return (
    //? Display the 4 random items

    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {randomItems.map((item) => (
        <Item key={item.id} product={item} />
      ))}
    </div>
  );
}
