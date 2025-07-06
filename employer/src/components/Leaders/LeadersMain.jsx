import LeadersList from "./LeadersList";

const LeadersMain = () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      {numbers.map((i) => (
        <LeadersList key={i} />
      ))}
    </div>
  );
};

export default LeadersMain;
