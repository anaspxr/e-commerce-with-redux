export default function ConfirmPopUp({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center justify-around flex-col bg-orange-50 p-6 rounded-sm min-h-40  shadow-lg text-center m-5">
        <p className="mb-4 text-lg text-slate-800">{message}</p>
        <div className="flex justify-end w-full space-x-4">
          <button
            className="px-6 py-2 bg-slate-700 text-white rounded-sm hover:bg-slate-600"
            onClick={onCancel}>
            No
          </button>
          <button
            className="px-8 py-2 bg-slate-700 text-white rounded-sm hover:bg-slate-600"
            onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
