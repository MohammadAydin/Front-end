import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";

const useData = (endpoint, requestConfig, queryOptions) => {
  const fetchData = () =>
    customFetch
      .get(endpoint, {
        ...requestConfig,
      })
      .then((res) => res.data);

  return useQuery({
    queryKey: requestConfig ? [endpoint, requestConfig] : [endpoint],
    queryFn: fetchData,
    ...(queryOptions || requestConfig?.queryOptions),
  });
};

export default useData;
