import { useState, useEffect } from "react";
import axiosErrorCatch from "../utils/axiosErrorCatch";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useGetPrivateData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosPrivate.get(url);
        setError(null);
        setData(data);
        setLoading(false);
      } catch (error) {
        const err = axiosErrorCatch(error);
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [axiosPrivate, url]);
  return { data, loading, error };
}
