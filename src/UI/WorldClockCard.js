import React from "react";

const WorldClockCard = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.cityName}</div>
        <p className="text-gray-700 text-base mt-2">
          Short label: <strong>{props.shortLabel}</strong>
        </p>
        <p className="text-gray-700 text-base mt-2">
          Current time: <strong>{props.currentLocalTime}</strong>
        </p>
        <p className="text-gray-700 text-base mt-2">
          City's timezone abbreviations: <strong>{props.abbreviation}</strong>
        </p>
        <p className="text-gray-700 text-base mt-2">
          Time difference: <strong>{props.timeDiff}</strong>
        </p>
      </div>
    </div>
  );
};

export default WorldClockCard;
