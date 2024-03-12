import React, { useState, useEffect } from "react";
import UserTimezone from "./UserTimezone";

const UserLocation = () => {
  const [userCity, setUserCity] = useState(null);
  const [userTimezone, setUserTimezone] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_API_KEY}`;

          const response = await fetch(apiUrl);
          if (!response.ok) return;

          const data = await response.json();

          const city = data.results[0].components.city;
          const timezone = data.results[0].annotations.timezone.name;
          setUserTimezone(timezone);
          setUserCity(city);
        });
      }
    };
    getLocation();
  }, []);

  return (
    <div className="flex text-center justify-center my-6 ">
      <p className="mr-5">
        Your City: <strong className="text-xl">{userCity}</strong>
      </p>
      <UserTimezone timezone={userTimezone}></UserTimezone>
    </div>
  );
};

export default UserLocation;
