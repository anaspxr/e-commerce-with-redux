import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaSquareGithub,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="mt-auto">
      <footer className="bg-orange-100 text-orange-800 p-3 py-10 font-serif">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start flex-col">
            <Link to="/">
              <img className="max-w-36" src={logo} alt="Comfort Craft" />
            </Link>
            <p>One stop solution for all your furniture needs</p>
            <p>Email: comfortcraft@mail.com </p>
            <p>&copy; 2021 Comfort Craft</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl text-orange-900">Quick Links</h2>
            <ul>
              <li
                className="cursor-pointer"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                Scroll to Top
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/#categories">Categories</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl text-orange-900">Company</h2>
            <ul>
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="text-xl text-orange-950">Connect With Us</h2>
            <ul className="flex gap-3 text-2xl">
              <li className="hover:text-orange-700">
                <a href="https://www.facebook.com">
                  <FaSquareFacebook />
                </a>
              </li>
              <li className="hover:text-orange-700">
                <a href="https://www.twitter.com">
                  <FaSquareXTwitter />
                </a>
              </li>
              <li className="hover:text-orange-700">
                <a href="https://www.instagram.com">
                  <FaSquareInstagram />
                </a>
              </li>
              <li className="hover:text-orange-700">
                <a href="https://www.github.com">
                  <FaSquareGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
