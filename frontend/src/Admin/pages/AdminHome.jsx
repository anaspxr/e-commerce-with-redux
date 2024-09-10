import useGetPrivateData from "../../hooks/useGetPrivateData";
import { Link } from "react-router-dom";
import MostSold from "../components/MostSold";
import BarChart from "../components/BarChart";

export default function Admin() {
  const { data, loading, error } = useGetPrivateData("admin/stats/count");

  const {
    data: revenueData,
    loading: revenueLoading,
    error: revenueError,
  } = useGetPrivateData("admin/stats/totalrevenue");

  const graphData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
    ],
    datasets: [
      {
        label: "Users",
        data: [50, 100, 75, 200, 150, 300, 250, 400, 30],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly User Signups",
      },
    },
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 ">
        <Link
          to="/admin/users"
          className="bg-white border-2 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-2xl">Users</p>
            <p className="text-2xl">{data?.users}</p>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Link>
        <Link
          to="/admin/products"
          className="bg-white border-2 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-2xl">Products</p>
            <p className="text-2xl">{data?.products}</p>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Link>
        <Link
          to="/admin/orders"
          className="bg-white border-2 px-2 py-5 rounded-md text-slate-500 hover:bg-slate-300">
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-2xl">Orders</p>
            <p className="text-2xl">{data?.orders}</p>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Link>
      </div>
      <div className="flex gap-2 flex-wrap md:flex-nowrap">
        <div className="bg-white border-2 px-2 py-5 rounded-md w-full text-slate-500 my-2">
          <p className="text-xl">Total Revenue</p>
          <p className="text-2xl">₹{revenueData?.stats.totalRevenue}</p>
          {revenueLoading && <p>Loading...</p>}
          {revenueError && <p>Error: {revenueError}</p>}
        </div>

        <div className="bg-white border-2 px-2 py-5 rounded-md w-full text-slate-500 my-2">
          <p className="text-xl">Most Sold Products</p>
          <MostSold />
        </div>
      </div>
      <div className="flex flex-col gap-5 border shadow-lg rounded-md ">
        <BarChart data={graphData} options={options} />
      </div>
    </div>
  );
}
