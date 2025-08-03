import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";

const useJobs = (endpoint) => {
  const fetchJobs = async () => {
    return customFetch.get(`/matching${endpoint}`).then((response) => {
      return response.data.data;
    });
  };

  return useQuery({
    queryKey: ["jobList", endpoint],
    queryFn: fetchJobs,
    retry: 1,
  });
};

export default useJobs;
