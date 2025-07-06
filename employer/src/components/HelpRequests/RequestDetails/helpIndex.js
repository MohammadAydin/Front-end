import avr from "../../../assets/image/Img_Avatar.25.svg";

const helpRequestDetails = {
  helpers: [
    {
      name: "Abdalrhman Alhowri",
      email: "adelkharzoum@gmail.com",
      position: "Nursing Specialist",
      avatar: avr,
    },
    {
      name: "Lina Saeed",
      email: "lina@example.com",
      position: "Nursing Assistant",
      avatar: avr,
    },
    {
      name: "Mohammed Khaled",
      email: "mkhaled@example.com",
      position: "Nursing Assistant",
      avatar: avr,
    },
  ],
  helpersNumber: 3,
  positionDetails:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  requestStatus: "Accepted",
  positionNeeded: "Nursing Specialist",
  dateFrom: "2024-11-19",
  dateTo: "2024-12-19",
  daysSchedule: [
    { day: "Sunday", shifts: ["9:00 PM - 6:00 AM", "7:00 AM - 9:00 AM"] },
    { day: "Monday", shifts: ["9:00 PM - 6:00 AM", "7:00 AM - 9:00 AM"] },
    { day: "Tuesday", shifts: ["9:00 PM - 6:00 AM", "7:00 AM - 9:00 AM"] },
    { day: "Wednesday", shifts: ["9:00 PM - 6:00 AM", "7:00 AM - 9:00 AM"] },
    { day: "Thursday", shifts: ["9:00 PM - 6:00 AM", "7:00 AM - 9:00 AM"] },
    { day: "Friday", shifts: [] },
    { day: "Saturday", shifts: [] },
  ],
};

export default helpRequestDetails;
