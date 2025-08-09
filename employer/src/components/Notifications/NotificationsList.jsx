import avatar from "../../assets/image/Img_Avatar.25.svg";

const NotificationsList = () => {
  return (
    <div className="flex items-center justify-between my-5">
      <div className="flex items-center justify-between gap-4">
        <img src={avatar} alt="" className="rounded-full" />
        <div>
          <p className="font-bold">Your request has been accepted by</p>
          <div className="flex gap-5 text-sm text-[#919EAB]">
            <span>07 Sep 2020</span>
            <span>Communication</span>
          </div>
        </div>
      </div>
      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    </div>
  );
};

export default NotificationsList;
