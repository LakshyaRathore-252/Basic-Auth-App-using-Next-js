import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // ✅ cookies will be sent automatically
});

const useFetch = (config = {}, options = { manual: false, successMessage: null }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance({
          ...config,
          ...overrideConfig,
        });

        setData(response.data);

        if (options.successMessage) {
          toast.success(options.successMessage);
        }

        return response.data;
      } catch (err) {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [config, options.successMessage]
  );

  useEffect(() => {
    if (!options.manual) {
      fetchData();
    }
  }, [fetchData, options.manual]);

  return { data, error, loading, fetchData };
};

export default useFetch;
