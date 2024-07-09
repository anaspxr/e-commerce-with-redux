import { useContext } from "react";
import Categories from "../components/Categories";
import Item from "../components/Item";
import { ProductContext } from "../contexts/ProductContext";
export default function Products({ category }) {
  const { products, loading, error } = useContext(ProductContext) || [];
  const items = products
    ? category === "furniture"
      ? products
      : products.filter((item) => item.category === category)
    : null;
  return (
    <div>
      {category === "furniture" && <Categories />}
      <h2 className="md:text-4xl text-3xl text-orange-900 my-5 text-center">
        {category === "furniture" && "All Furnitures"}
        {category === "homedecor" && "Home & office decors"}
        {category === "sofas" && "Sofas & Seatings"}
        {category === "dining" && "Kitchen & Dining"}
        {category === "furnishings" && "Furnishings"}
        {category === "lightings" && "Lamps & Lightings"}
        {category === "mattresses" && "Mattresses"}
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {items && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 p-2 sm:p-3 lg:p-5">
          {items.map((item) => (
            <Item key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
