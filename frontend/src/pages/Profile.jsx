import Button from "../components/Button";
import Address from "../components/Address";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="grid md:grid-cols-2 p-5 my-10 shadow-lg  border mx-5 md:mx-32">
      <div className=" p-5 flex  flex-col rounded-lg gap-5">
        <h1 className="text-2xl text-orange-900">User Details</h1>
        <p className="text-lg text-orange-900">Name: {currentUser.name}</p>
        <p className="text-lg text-orange-900">Email: {currentUser.email}</p>
        <span
          onClick={() => {
            dispatch(logout());
          }}
        >
          <Button>Log out</Button>
        </span>
      </div>
      <Address />
    </div>
  );
}
