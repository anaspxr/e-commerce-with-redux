import Categories from "../components/Categories";
import Item from "../components/Item";
import useFetch from "../utils/useFetch";
export default function Products({ category }) {
  const url = `public/products${category ? `?category=${category}` : ""}`;
  const { data, loading, error } = useFetch(url);

  const products = data?.products;

  return (
    <div>
      {!category && <Categories />}
      <h2 className="md:text-4xl text-3xl text-orange-900 my-5 text-center">
        {!category && "Explore"}
        {category === "homedecor" && "Home & office decors"}
        {category === "sofas" && "Sofas & Seatings"}
        {category === "dining" && "Kitchen & Dining"}
        {category === "furnishings" && "Furnishings"}
        {category === "lightings" && "Lamps & Lightings"}
        {category === "mattresses" && "Mattresses"}
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
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
