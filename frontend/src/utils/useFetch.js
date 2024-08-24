import { useState, useEffect } from "react";
import axios from "../utils/axios";
import axiosErrorCatch from "./axiosErrorCatch";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
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
  }, [url]);
  return { data, loading, error };
}
