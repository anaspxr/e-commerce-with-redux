export default function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick || (() => {})}
      className={` border-2 border-orange-900  w-full flex justify-between items-center gap-2 text-orange-950 px-4
       py-2 rounded-md hover:bg-orange-100 transition duration-300 ${className}`}>
      {children}
    </button>
  );
}
