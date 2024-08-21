import { useSelector } from "react-redux";

export default function CheckOutPayment({ buyItems }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const address = {
    name: currentUser.name,
    city: "manjeri",
    flatName: "mows",
    state: "kerala",
    pincode: "766521",
    phone: "9876543210",
  };
  return (
    <div className="m-auto max-w-3xl p-5 text-orange-900">
      <h1 className="text-2xl py-3">Payment</h1>

      <p className="text-xl">Your address</p>
      <p>{address.name}</p>
      <p>
        {address.flatName},{address.city},{address.state},{address.pincode}
      </p>
      <p>{address.phone}</p>
      <h3 className="text-xl py-5">Items</h3>
      <div className="flex flex-col gap-2">
        {buyItems.map((product) => {
          const productDetails = product.productID;
          return (
            <>
              {product && (
                <div key={productDetails._id} className="flex justify-between">
                  <p>{productDetails.name}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
