import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // cookies will be sent automatically
});

const useFetch = (config = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fn = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance({
          ...config,
          ...overrideConfig,
        });

        setData(response?.data);

        // Only show toast if backend sends a message
        if (response?.data?.message) {
          toast.success(response.data.message);
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
    [config]
  );

  // No automatic fetch on mount
  return { data, error, loading, fn };
};

export default useFetch;
