import React from "react";
import useData from "../../hooks/useData";
import { Link } from "react-router-dom";

import { GiPathDistance } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import customFetch from "../../utils/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { RiErrorWarningLine } from "react-icons/ri";
import SuccsessPopup from "../../components/FormElements/SuccsessPopup";

const LocationInfo = () => {
  const queryClient = useQueryClient();

  const {
    data: locations,
    errorlocations,
    isLoadinglocations,
  } = useData("/locations", "locationsList");
  console.log(locations);

  const {
    data: workable,
    error,
    isLoading,
  } = useData("/profile/workable-distance");

  // To delete a locatiomn
  const deleteLocation = useMutation({
    mutationFn: (id) =>
      customFetch.delete(`/locations/${id}`).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["/locations", "locationsList"],
      });
      toast.success(data.message || "Job decline successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to decline job");
    },
  });
  // To reject a jobRequest
  const Activate = useMutation({
    mutationFn: (id) =>
      customFetch.put(`/locations/${id}/activate`).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["/locations", "locationsList"],
      });
      toast.success(data.message || "Job decline successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to decline job");
    },
  });

  return (
    <>
      <div className="py-5 px-5">
        <div>LocationInfo</div>
        <div className="mt-5 flex flex-col">
          <div className="list-location">
            {/* Container with the bottom section for adding addresses */}
            <div className="mt-8 shadow-locationsList p-3.5 mb-5">
              {/* A container that contains the container title and the add button{" "} */}
              <div className="flex justify-between max-[600px]:flex-col max-[600px]:gap-2.5">
                <p>Addresses</p>
                {/* When the add button is pressed, a popup opens to add the address */}
                <Link
                  to={`/addLoaction/${locations?.length}`}
                  className="flex items-center gap-1.5  text-white bg-amber-600 p-1.5 rounded-xl max-[600px]:w-fit  max-[600px]:text-[14px] "
                >
                  <FaPlus />
                  Add new Address
                </Link>
              </div>
              {locations?.length == 0 && (
                <div className="flex justify-center items-center gap-1 mt-6">
                  <RiErrorWarningLine className="text-2xl text-secondaryColor" />

                  <p className=" ">
                    There is no address currently, Please add an address.
                  </p>
                </div>
              )}
              {/* A container containing the added addresses  */}
              <div className="mt-3.5 ">
                {/* Displaying address array data */}
                {locations?.map((location, index) => (
                  <div
                    key={location.id}
                    className="row-info flex max-[670px]:flex-col max-[670px]:items-start gap-20 max-[670px]:gap-3  p-2.5 items-center mb-1.5"
                  >
                    <h2 className=""> Address {index + 1} </h2>
                    <div
                      className="flex justify-between flex-1 gap-3.5 max-[820px]:w-full
"
                    >
                      <div className="address-info gap-10 flex items-center max-[545px]:flex-col max-[545px]:items-start max-[545px]:gap-2.5 ">
                        <p>{location.street1}</p>
                        <p>{location.city}</p>
                        <p>{location.postal_code}</p>
                      </div>
                      {/* Container with delete and edit buttons */}
                      <div className="chose flex items-center gap-2.5 max-[860px]:flex-col w-[200px] justify-between">
                        <button
                          onClick={() => Activate.mutate(location.id)}
                          className={` ${
                            location.is_active == 1
                              ? "bg-green-500 non-click"
                              : " bg-gray-500"
                          } text-white py-1 w-[100px] rounded-[5px]`}
                          disabled={location.is_active}
                        >
                          {location.is_active ? "Active" : "Activate"}
                        </button>
                        {location.is_primary == 1 ? (
                          <div
                            className="text-center  bg-secondaryColor
                             text-white py-1 w-[100px] rounded-[5px] non-click"
                          >
                            is Primary
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center justify-center w-[100px]">
                            <Link
                              to={`/editLocation/${location.id}/${location.title}/${location.street1}/${location.street2}/${location.postal_code}/${location.city}/${location.country}`}
                            >
                              <RiPencilLine className="click text-[1.5rem] text-gray-400" />
                            </Link>
                            <FaRegTrashCan
                              onClick={() => deleteLocation.mutate(location.id)}
                              className="click text-[1.2rem] text-red-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white shadow-md rounded-lg max-w-md">
            <GiPathDistance className="text-4xl text-secondaryColor" />
            <div className="w-full">
              <div className="flex justify-between w-full">
                <p className="text-gray-500 text-sm">
                  The distance that can be worked with is{" "}
                </p>
                <Link to={`/EditWorkaBilities/${workable?.workable_distance}`}>
                  <RiPencilLine className="click text-[1.5rem] text-gray-400" />
                </Link>
              </div>
              <div className="flex gap-3 items-center ">
                <p className="text-lg font-semibold text-gray-800">
                  {workable?.workable_distance} km
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccsessPopup />
    </>
  );
};

export default LocationInfo;
