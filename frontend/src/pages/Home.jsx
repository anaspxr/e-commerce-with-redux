import Categories from "../components/Categories";
import Hero from "../components/Hero";
import Popular from "../components/Popular";
import { Recommend } from "../components/Recommend";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Popular />
      <div>
        <div className="p-2 sm:p-3 lg:p-5 bg-stone-50">
          <h1 className="text-2xl text-orange-900 font-semibold my-5 ">
            Suggested for you
          </h1>
          <Recommend />
        </div>
      </div>
    </div>
  );
}
