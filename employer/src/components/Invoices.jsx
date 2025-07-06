// Scrolling Props from the Dashboard page
const Invoices = ({ title, text, price, icon }) => {
  return (
    // Container containing the partition
    <div className="flex items-center gap-[20px] item p-3.5 ">
      {/* Show icon */}
      {icon}
      {/* Container with title and values */}
      <div className="item-text">
        <p>{title}</p>
        <p className="invoices">{text}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default Invoices;
