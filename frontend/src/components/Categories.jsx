import { Link } from "react-router-dom";

export default function Categories() {
  const categories = [
    {
      name: "Sofas & Seatings",
      image:
        "https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg",
      to: "/products/sofas",
    },
    {
      name: "Home Decor",
      image:
        "https://cdn.pixabay.com/photo/2016/04/18/13/53/room-1336497_1280.jpg",
      to: "/products/homedecor",
    },
    {
      name: "Kitchen & Dining",
      image:
        "https://cdn.pixabay.com/photo/2019/02/17/17/36/table-setting-4002726_1280.jpg",
      to: "/products/dining",
    },
    {
      name: "Furnishing",
      image:
        "https://media.licdn.com/dms/image/C561BAQHm8kScK_qjNg/company-background_10000/0/1631040871144/noble_house_home_furnishings_llc_cover?e=2147483647&v=beta&t=aJMgH1BmiEJk0chBP8E6MpJMCLpgpX3WrucOwuHzlW0",
      to: "/products/furnishings",
    },
    {
      name: "Lightings",
      image:
        "https://cdn.pixabay.com/photo/2014/09/28/21/30/light-465350_1280.jpg",
      to: "/products/lightings",
    },
    {
      name: "Mattresses",
      image:
        "https://cdn.pixabay.com/photo/2018/07/14/17/19/interior-3538020_1280.jpg",
      to: "/products/mattresses",
    },
  ];
  return (
    <div
      id="categories"
      className=" flex flex-col items-center bg-orange-50 py-10"
    >
      <h1 className="text-3xl text-orange-900 m-10">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-2">
        {categories.map((category, i) => (
          <Link to={category.to} key={i} className="m-2">
            <img
              src={category.image}
              alt={category.name}
              className="h-40 w-full object-cover rounded-md hover:scale-105 transition duration-300  shadow-md"
            />
            <p className="text-orange-900 text-lg text-center">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
