import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-center text-orange-900 text-4xl mt-5">404</h1>
      <h1 className="text-center text-orange-900 text-4xl mt-5 mb-5">
        Page Not Found!!
      </h1>
      <Link
        to="/"
        className="bg-orange-200 text-orange-900 px-4 py-2 rounded-md hover:bg-orange-300">
        Go back to Home
      </Link>
    </div>
  );
}
