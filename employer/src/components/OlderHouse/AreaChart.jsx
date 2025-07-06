import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ color }) => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Requests",
        data: [10, 15, 12, 20, 18, 25, 22],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 100,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      colors: [color],
      tooltip: {
        enabled: true,
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={100}
      />
    </div>
  );
};

export default ApexChart;
