import React, { useCallback, useEffect } from "react";
import { useData } from "../Hooks/useWorldClockContext";

const UserTimezone = (props) => {
  const getCurrentTime = useCallback(() => {
    const cityTimeZone = props.timezone;
    const options = {
      timezone: cityTimeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date().toLocaleTimeString("en-US", options);
  }, [props.timezone]);

  const { currentTime, setCurrentTime } = useData(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [setCurrentTime, getCurrentTime]);

  return (
    <>
      <p>
        Current your city's timezone:{" "}
        <strong className="text-xl">{currentTime}</strong>
      </p>
    </>
  );
};

export default UserTimezone;
