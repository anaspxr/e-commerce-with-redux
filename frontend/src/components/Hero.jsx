import Button from "./Button";
import heroImage from "./assets/hero-min.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 items-center p-5 gap-2 md:px-20 2xl:px-52">
      <div className="md:-mt-10">
        <h1 className="md:text-6xl text-5xl xl:text-8xl 2xl:text-9xl text-orange-900 my-1 font-bold">
          Comfort Craft
        </h1>
        <p className="text-lg text-orange-800">
          One stop solution for all your furniture needs
        </p>
        <p className="text-orange-800">
          Discover Elegant and affordable furniture for every room in your
          house.
        </p>
        <div className="flex gap-5 flex-wrap mt-5">
          <Link to="/products">
            <Button>Shop Now</Button>
          </Link>
          <Link to="/#categories">
            <Button>Browse Categories</Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <img className="md:max-w-full sm:max-w-lg" src={heroImage} alt="" />
      </div>
    </div>
  );
}
