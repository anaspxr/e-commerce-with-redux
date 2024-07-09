export default function Alerts({ type, message }) {
  if (type === "success") {
    return (
      <div className="bg-green-200 p-2 flex items-center justify-center rounded-lg transition-opacity duration-1000">
        <p className="text-green-900">{message}</p>
      </div>
    );
  } else if (type === "warning") {
    return (
      <div className="bg-red-200 p-2 flex items-center justify-center rounded-lg transition-opacity duration-1000">
        <p className="text-red-900">{message}</p>
      </div>
    );
  }
  return (
    <div className="bg-slate-200 p-2 flex items-center justify-center rounded-lg transition-opacity duration-1000">
      <p className="text-slate-900">{message}</p>
    </div>
  );
}
