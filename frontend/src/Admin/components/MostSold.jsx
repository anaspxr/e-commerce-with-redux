import useGetPrivateData from "../../hooks/useGetPrivateData";

export default function MostSold() {
  const { data, loading, error } = useGetPrivateData("/admin/stats/mostsold");

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data?.stats && (
        <div>
          <div className="flex justify-between items-center border-b border-slate-400">
            <p className="text-lg font-semibold ">Product</p>
            <p>Total Sold</p>
          </div>
          {data.stats.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center">
              <p>{product.productDetails.name}</p>
              <p>{product.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
