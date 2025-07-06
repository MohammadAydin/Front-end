import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";

const useData = (endpoint, requestConfig) => {
  const fetchData = () =>
    customFetch
      .get(endpoint, {
        ...requestConfig,
      })
      .then((res) => res.data.data);

  return useQuery({
    queryKey: requestConfig ? [endpoint, requestConfig] : [endpoint],
    queryFn: fetchData,
  });
};

export default useData;
