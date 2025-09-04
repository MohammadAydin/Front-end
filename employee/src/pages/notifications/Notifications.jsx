import React, { useState } from "react";
import useData from "../../hooks/useData";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosArrowDropleft, IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { data, error, isLoading } = useData("/notifications");
  const [expandedId, setExpandedId] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "info-circle":
        return <AiOutlineInfoCircle size={20} className="text-blue-500" />;
      default:
        return <AiOutlineInfoCircle size={20} className="text-blue-500" />;
    }
  };

  const getColor = (color) => {
    switch (color) {
      case "blue":
        return "border-l-blue-500 bg-blue-50";
      case "red":
        return "border-l-red-500 bg-red-50";
      case "green":
        return "border-l-green-500 bg-green-50";
      case "yellow":
        return "border-l-yellow-500 bg-yellow-50";
      case "orange":
        return "border-l-orange-500 bg-orange-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error loading notifications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl px-3 mt-6 py-6">
          <Link className="text-[1.2em] flex gap-1 items-center" to={-1}>
            <IoIosArrowDropleft className="text-2xl" />
            back
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-2xl font-bold text-gray-800 ">Notifications</h1>
            <IoIosNotificationsOutline className="text-3xl mt-[1px]" />
          </div>

          <p className="text-gray-500 mt-1">
            {data ? `${data.length} notifications` : "No notifications"}
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {!data || data.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No notifications found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((notification) => {
              const isExpanded = expandedId === notification.id;
              const isUnread = !notification.read_at;
              const colorClass = getColor(notification.type_details?.color);

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg border-l-4 ${colorClass} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : notification.id)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getIcon(notification.type_details?.icon)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">
                              {notification.title}
                            </h3>
                            {isUnread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{notification.created_at}</span>
                            <span
                              className={`px-2 py-1 ${colorClass} rounded text-xs`}
                            >
                              {notification.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <IoArrowDownCircleOutline
                        className={`text-3xl text-blue-500`}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-700">{notification.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
