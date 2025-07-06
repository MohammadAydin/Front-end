// Receive some props from the dashboard page
const Card = ({ title, num, icon, text, chart }) => {
  return (
    // Container containing the entire card
    <div className="card flex p-4 items-center justify-between gap-[20px] item-card  ">
      {/* Container with card data */}
      <div className="flex flex-col gap-2.5 items-center ">
        {/* Title card */}
        <p className="text-[0.8rem]">{title}</p>
        <div>
          {/* Container with the icon */}
          <div className="flex items-center gap-1.5 ">
            {num}
            {icon}
          </div>
          <p className="text-[0.6rem]">{text}</p>
        </div>
      </div>
      {/* A container containing the chart */}
      <div className="w-30">{chart}</div>
    </div>
  );
};

export default Card;
