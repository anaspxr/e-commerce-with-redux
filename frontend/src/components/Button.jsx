export default function Button(props) {
  return (
    <button className="bg-orange-700 flex justify-around items-center gap-2 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition duration-300">
      {props.children}
    </button>
  );
}
