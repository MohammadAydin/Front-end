import React from "react";
import useData from "../hooks/useData";
import customFetch from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Contract = () => {
  const fetchData = () =>
    customFetch.get("/employee/contract/html").then((res) => res.data);

  const { data } = useQuery({
    queryKey: ["/employee/contract/html"],
    queryFn: fetchData,
  });
  console.log(data);

  return (
    <>
      <div className="ml-3.5">
        <Link to="/profile" className="px-4 flex items-center gap-2.5">
          <FaArrowLeft />
          <p className="text-[20px]">Back</p>
        </Link>

        <div dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </>
  );
};

export default Contract;
