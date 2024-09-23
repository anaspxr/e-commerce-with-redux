import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ItemSkeleton() {
  return (
    <div className="flex flex-col justify-between  bg-white shadow-2xl overflow-hidden rounded-md border">
      <Skeleton className="top-0 left-0  w-full h-32 lg:h-60 object-cover" />

      <div className="flex justify-between">
        <div className="flex flex-col justify-between h-full p-3">
          <div className="flex flex-col gap-2">
            <Skeleton
              containerClassName="flex-1"
              className="text-lg sm:w-40 lg:w-60"
            />
            <div className="flex flex-wrap gap-x-5">
              <Skeleton height={20} className="w-20" />
              <Skeleton height={20} className="w-16" />
            </div>
            <p className="text-green-800">
              <Skeleton
                containerClassName="flex-1"
                height={20}
                className="w-full"
              />
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 m-3">
          <Skeleton className="h-7 w-7 z-20 rounded-full " />

          <Skeleton className="h-7 w-7 rounded-full z-20" />
        </div>
      </div>
      <div className="flex justify-center  gap-1 lg:gap-2 lg:p-2 sm:p-1 p-0.5">
        <Skeleton
          containerClassName="flex-1"
          className="w-full px-2 py-1 sm:h-12 h-10 border-2  transition duration-300 lg:text-base sm:text-xs text-[10px] "
        />

        <Skeleton
          containerClassName="flex-1"
          className=" w-full flex-1 px-2 py-1 sm:h-12 h-10 border-2  transition duration-300 lg:text-base sm:text-xs text-[10px] "
        />
      </div>
    </div>
  );
}
