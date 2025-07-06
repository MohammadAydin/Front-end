const statusTask = (text) => {
  const status = {
    statusText: "",
    statusColorClass: "",
  };

  if (text === "todo") {
    status.statusText = "Upcoming";
    status.statusColorClass = "bg-orange-500";
  } else if (text === "done") {
    status.statusText = "Complete";
    status.statusColorClass = "bg-green-500";
  } else if (text === "progress") {
    status.statusText = "In progress";
    status.statusColorClass = "bg-green-300";
  } else if (text === "review") {
    status.statusText = "Review";
    status.statusColorClass = "bg-yellow-400";
  }  else if (text === "cansle") {
    status.statusText = "Cansle";
    status.statusColorClass = "bg-red-400";
  } else {
    status.statusText = "Unknown";
    status.statusColorClass = "bg-gray-300";
  }

  return status;
};

export default statusTask;
