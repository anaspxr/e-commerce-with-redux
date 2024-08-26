import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductsList({ products }) {
  return (
    <div className="mt-5 grid lg:grid-cols-2 gap-2">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-slate-200 flex items-center border-b justify-between p-1 px-10 rounded-sm shadow-md">
          <div>
            <p className="text-xl font-semibold">{product.name}</p>
            <img
              src={product.image}
              alt="product image"
              className="h-16 object-cover w-28 rounded-sm"
            />
            <p className="text-gray-600">Price: {product.price}</p>
            <p className="text-gray-500">Old Price: {product.oldPrice} </p>
            <p className="text-gray-600">
              Categories: {product.category.join(", ")}{" "}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              to={`/admin/products/${product.id}`}
              className="bg-slate-500 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85">
              Edit <FaRegEdit />
            </Link>
            <button className="bg-red-700 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85">
              Delete <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
