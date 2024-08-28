import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Item from "../components/Item";
import LoadingAndError from "../components/LoadingAndError";
import useFetch from "../utils/useFetch";
export default function Products({ category }) {
  const url = `public/products${category ? `?category=${category}` : ""}`;
  const { data, loading, error } = useFetch(url);
  const [pageTitle, setPageTitle] = useState("Explore");

  useEffect(() => {
    switch (category) {
      case "homedecor":
        setPageTitle("Home & office decors");
        break;
      case "sofa":
        setPageTitle("Sofas & Seatings");
        break;
      case "dining":
        setPageTitle("Kitchen & Dining");
        break;
      case "furnishings":
        setPageTitle("Furnishings");
        break;
      case "lightings":
        setPageTitle("Lamps & Lightings");
        break;
      case "mattresses":
        setPageTitle("Mattresses");
        break;
      default:
        setPageTitle("Explore");
    }
  }, [category]);

  const products = data?.products;

  return (
    <div>
      {!category && <Categories />}
      <h2 className="md:text-4xl text-3xl text-orange-900 my-5 text-center">
        {pageTitle}
      </h2>
      <LoadingAndError loading={loading} error={error} />
      {products && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 p-2 sm:p-3 lg:p-5">
          {products.map((item) => (
            <Item key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
