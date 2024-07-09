import { useState } from "react";
import useFetch from "../utils/useFetch";
import SearchField from "../components/SearchField";
import getSearchResults from "../utils/getSearchResults";

export default function UsersPage() {
  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch("http://localhost:3000/users");

  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch("http://localhost:3000/products");

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-700">Users</h1>
      {selectedUser && (
        <div className="flex flex-col gap-2 bg-slate-200 border shadow-lg rounded-md w-fit m-auto p-5 text-slate-600">
          <h2 className="text-xl  font-semibold">{selectedUser.name}</h2>
          <p>{selectedUser.email}</p>
          <p>
            Address:{" "}
            {selectedUser.address.address
              ? `${selectedUser.address.address}, ${selectedUser.address.city}, ${selectedUser.address.pincode}`
              : "User not updated their address"}
          </p>
          <p>
            Phone:
            {selectedUser.address.phone
              ? selectedUser.address.phone
              : "User not updated their phone number"}
          </p>

          {products ? (
            <div>
              <p className="font-bold">Orders:</p>
              {Object.keys(selectedUser.orders).length === 0 && "No orders"}
              {Object.keys(selectedUser.orders).map((productID) => {
                const product = products.find((item) => item.id === productID);

                return (
                  <>
                    <p key={productID}>
                      {product.name} x {selectedUser.orders[productID].quantity}
                    </p>
                    <p className="text-slate-500 mb-2">
                      Status: {selectedUser.orders[productID].status}{" "}
                    </p>
                  </>
                );
              })}
            </div>
          ) : (
            <>
              {loadingProducts && <p>Loading</p>}
              {errorProducts && (
                <p>Error fetching products data {errorProducts} </p>
              )}
            </>
          )}
        </div>
      )}
      {errorUsers && <p>{errorUsers.message}</p>}
      {loadingUsers && <p>Loading...</p>}
      {users && <UsersList users={users} setSelectedUser={setSelectedUser} />}
    </div>
  );
}

function UsersList({ users, setSelectedUser }) {
  const [displayUsers, setDisplayUsers] = useState(users);
  const [toggle, setToggle] = useState(false);
  function handleSearch(value) {
    setDisplayUsers(getSearchResults(users, value, ["name", "email"]));
  }
  return (
    <div>
      <div className="flex justify-end items-center gap-2">
        <SearchField
          searchData={users}
          handleSearch={handleSearch}
          searchItems={["name", "email"]}
          handleClick={(user) => setSelectedUser(user)}
        />
        <button
          className="bg-slate-500 text-white rounded-md p-1 text-sm my-3 hover:bg-opacity-90"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "Show Users" : "Show Admins"}
        </button>
      </div>
      <ul className="flex flex-col justify-between space-y-2">
        {displayUsers.length === 0 && <p>No results found</p>}
        {displayUsers
          .filter((user) => (toggle ? user.isAdmin : !user.isAdmin))
          .map((user) => (
            <li
              key={user.id}
              className="flex justify-between sm p-2 bg-gray-200 rounded-md"
            >
              <div>
                <p className="text-slate-500">{user.name}</p>
                <p className="text-slate-700">{user.email}</p>
                {!toggle && (
                  <p className="text-slate-600">
                    Orders:{Object.keys(user.orders).length}
                  </p>
                )}
              </div>
              {!toggle && (
                <button
                  className="text-blue-500 w-40 p-1 rounded-md hover:bg-slate-300"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setSelectedUser(user);
                  }}
                >
                  See Details
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
