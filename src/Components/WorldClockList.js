import React from "react";
import { useData } from "../Hooks/useWorldClockContext";
import WorldClockCard from "../UI/WorldClockCard";

const WorldClockList = () => {
  const { listWorldClock } = useData();

  let content = (
    <p className="text-center col-span-3">Empty world clock list!!!!</p>
  );
  if (listWorldClock.length > 0) {
    content = listWorldClock.map((item, index) => (
      <WorldClockCard
        key={index}
        cityName={item.cityName}
        shortLabel={item.shortLabel}
        currentLocalTime={item.localTime}
        abbreviation={item.abbreviation}
        timeDiff={item.timeDiff}
      ></WorldClockCard>
    ));
  }

  return <div className="mt-6 grid grid-cols-3 gap-6 ">{content}</div>;
};

export default WorldClockList;
