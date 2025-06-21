import axios from "axios";
import { useState, useEffect } from "react";
export const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "x-rapidapi-key": "5e06b61062mshc6940e31ceb7ce0p13da94jsn7d25bccf6d2b",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    console.log(options);
    setIsLoading(true);
    try {
      const { data } = await axios.request(options);
      setData(data.data);
    } catch (error) {
      alert("Something went wrong!");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { data, error, isLoading, refetch };
};
