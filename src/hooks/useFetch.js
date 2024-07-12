import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
  const { method = "GET", body = null, headers = {} } = options;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers,
      });
      setData(response.data);
      setError("");
      // console.log(response.data);
    } catch (error) {
      setError(error);
      setData();
    } finally {
      setIsLoading(false);
    }
  }, [url, method, body, headers]);

  useEffect(() => {
    // console.log("Fetching data...");
    fetchData();
  }, [url]);

  // console.log("Data:", data);
  // console.log("Is Loading:", isLoading);
  // console.log("Error:", error);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
