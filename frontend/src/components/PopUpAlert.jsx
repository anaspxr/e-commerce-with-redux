export default function PopUpAlert({
  type,
  message,
  handleConfirm,
  handleCancel,
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-2 rounded-md min-h-40 min-w-80 flex text-center justify-around flex-col">
        <p>{message}</p>
        <div className="flex justify-end">
          {type === "confirm" ? (
            <div>
              <button
                onClick={handleConfirm}
                className="bg-slate-600 text-slate-200 p-1 rounded-md mr-1 hover:bg-slate-500"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="bg-slate-600 text-slate-200 p-1 rounded-md mr-1 hover:bg-slate-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button>Ok</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
