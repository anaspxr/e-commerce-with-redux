import { BeatLoader } from "react-spinners";

export default function LoadingAndError({ loading, error }) {
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center flex-col gap-5">
          <BeatLoader size={12} color="brown" />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </>
  );
}
