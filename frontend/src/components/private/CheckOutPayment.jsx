import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const stripePromise = loadStripe(
  "pk_test_51PqTjg2KqNuB5bGxCB5yBjHnBJ9KgoKCDs6MLYOzL9a4x0DEjsxoMZiQp5fR222KFS4cwwxRBCDjlrnL7IHAIlPj00ICeQqUlR"
);

export default function CheckOutPayment({ buyItems, address }) {
  const axiosPrivate = useAxiosPrivate();
  const totalAmount = buyItems.reduce(
    (acc, product) => acc + product.productID?.price * product.quantity,
    0
  );

  const fetchClientSecret = async () => {
    const body = {
      amount: totalAmount,
      products: buyItems.map((product) => ({
        productID: product.productID._id,
        quantity: product.quantity,
      })),
      address, // comes from the address component
    };
    const { data } = await axiosPrivate.post("/user/checkout", body);
    return data.clientSecret;
  };

  const options = { fetchClientSecret };

  return (
    <div className="m-auto max-w-3xl p-5 text-orange-900">
      <h1 className="text-2xl py-3 text-center">Payment</h1>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
