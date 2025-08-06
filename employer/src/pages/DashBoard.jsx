import Wrapper from "../assets/wrapper/OlderHouse/DashBoard";
import Select from "../components/OlderHouse/Select";
import { PiReceiptLight, PiSortAscending } from "react-icons/pi";
import { BsCardChecklist } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { RiFolderOpenLine } from "react-icons/ri";
import AreaChart from "../components/OlderHouse/AreaChart";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import Invoices from "../components/Invoices";
import Card from "../components/Card";
import customFetch from "../utils/axios";
import axios from "axios";
import useData from "../hooks/useData";
import { useNavigate } from "react-router-dom";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
import useStatusAccount from "../store/storeStatusAccount";
import { useEffect } from "react";
import statusAccount from "../utils/statusAccountReturn";

const DashBoard = () => {
  const { data: statusData, error, isLoading } = useData("/status/profile");

  useEffect(() => {
    if (statusData?.data?.status) {
      localStorage.setItem("statusAccount", statusData?.data?.status);
    }
  }, [statusData?.data?.status]);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  if (localStorage.getItem("statusAccount") !== "approved") {
    return statusAccount(localStorage.getItem("statusAccount"));
  }

  // const refresh = async () => {
  //   try {
  //     await axios
  //       .post("https://woundwann.de/v1/refresh")
  //       .then((res) => console.log(res));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    // Dashboard wrapper
    <Wrapper className="mt-6 ml-1.5  w-full pr-3.5 ">
      <CompletePersonalinfo />

      {/* Full Dashboard Container */}
      <div className="w-full DashBoard">
        {/* Container with the financial statistics section at the top */}
        <div className="Details text-[0.8rem]">
          <div className="flex justify-between w-full items-center">
            {/* Top title */}
            <p>Invoices Details</p>
            {/* Container with filter and logout button */}

            <Select title="Per Week" />
          </div>
          {/* Container with financial statistics sections  */}
          <div className="flex gap-10 w-full justify-around item-group flex-wrap">
            <Invoices
              icon={<PiReceiptLight className="text-2xl text-blue-600" />}
              title="Total"
              text="4 invoices"
              price="$275.43"
            />
            <Invoices
              icon={<BsCardChecklist className="text-2xl text-green-600" />}
              title="Paid"
              text="4 invoices"
              price="$446.61"
            />

            <Invoices
              icon={<PiSortAscending className="text-2xl text-orange-400" />}
              title="Pending"
              text="4 invoices"
              price="$490.51"
            />

            <Invoices
              icon={<GoBell className="text-2xl text-orange-400" />}
              title="Overdue"
              text="4 invoices"
              price="$601.13"
            />

            <Invoices
              icon={<RiFolderOpenLine className="text-2xl text-gray-500" />}
              title="Draft"
              text="4 invoices"
              price="$739.65"
            />
          </div>
        </div>
        {/* Container containing the graphical statistics section */}
        <div className="Details mt-3.5 ">
          {/* Container containing the head and filter */}
          <div className="flex justify-between w-full items-center">
            <p>Analysis</p>
            <div className="flex gap-2.5">
              <Select title="Per Week" />
              <Select title="Per Week" />
            </div>
          </div>
          {/* Container with graphic cards */}
          <div className="flex gap-4 w-full justify-center mt-2.5 flex-wrap ">
            <Card
              title="Help Requests sent"
              num="22"
              icon={<IoArrowUpCircleOutline className="text-green-600" />}
              text="Compared to last week"
              chart={<AreaChart color="#4EAF51" />}
            />
            <Card
              title="Help Requests sent"
              num="22"
              icon={<IoArrowUpCircleOutline className="text-green-600" />}
              text="Compared to last week"
              chart={<AreaChart color="#FF6400" />}
            />
            <Card
              title="Help Requests sent"
              num="22"
              icon={<IoArrowUpCircleOutline className="text-green-600" />}
              text="Compared to last week"
              chart={<AreaChart color="#FF5630" />}
            />
          </div>
        </div>
        {/* <button onClick={refresh} className="bg-amber-500">
          Refresh Token
        </button> */}
      </div>
    </Wrapper>
  );
};

export default DashBoard;
