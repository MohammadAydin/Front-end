import React from "react";
import useData from "../hooks/useData";
import customFetch from "../utils/axios";
import { useQuery } from "@tanstack/react-query";

const Contract = () => {
  const fetchData = () =>
    customFetch.get("/employee/contract/html").then((res) => res.data);

  const { data } = useQuery({
    queryKey: ["/employee/contract/html"],
    queryFn: fetchData,
  });
  console.log(data);

  return <div>Contract</div>;
};
export default Contract;
