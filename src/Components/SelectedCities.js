import React, { useEffect, useState } from "react";
import Select from "react-select";
import { INITIAL_CITIES } from "../Docs/Data";
import { useData } from "../Hooks/useWorldClockContext";
import { format, utcToZonedTime } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";

const SelectedCities = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(false);
  const { setWorldClockData, currentTime } = useData();

  const getShortlabel = (cityName) => {
    return cityName.slice(0, 3).toUpperCase();
  };

  const convertSecondsToTime = (timeDiff) => {
    const convertTimeDiffToMilliseconds = timeDiff * 1000;
    const date = new Date(convertTimeDiffToMilliseconds);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
  };

  const fetchDataClock = async (objOpt) => {
    const timezone = objOpt.value;
    const cityName = timezone.split("/")[1];
    const response = await fetch(
      `https://worldtimeapi.org/api/timezone/${timezone}`
    );
    const data = await response.json();
    console.log(data);

    const localTime = utcToZonedTime(data.utc_datetime, data.timezone);

    const objClock = {
      cityName,
      shortLabel: getShortlabel(cityName),
      localTime: format(localTime, "dd-MM-yyyy HH:mm:ss", {
        timeZone: data.timezone,
        locale: enUS,
      }).toString(),
      abbreviation: data.abbreviation,
      timeDiff: convertSecondsToTime(data.raw_offset),
    };

    return objClock;
  };

  const convertToArrWorldClock = async (arrSelected) => {
    const arrWorldClock = await Promise.all(
      arrSelected.map(async (objOpt) => await fetchDataClock(objOpt))
    );
    setWorldClockData(arrWorldClock);
  };

  useEffect(
    () => {
      convertToArrWorldClock(selectedOptions);
    },
    [currentTime, selectedOptions],
    convertToArrWorldClock
  );

  const handleMultiSelectChange = (selectedOptions) => {
    const limitCities = 4;
    if (selectedOptions.length <= limitCities) {
      setSelectedOptions(selectedOptions);
      convertToArrWorldClock(selectedOptions);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <p className="text-lg mb-2 ">Choice cities: </p>
      <Select
        options={INITIAL_CITIES}
        isMulti
        onChange={handleMultiSelectChange}
        value={selectedOptions}
      />
      {error && (
        <p className="text-center text-base text-red-700 font-medium mt-3">
          Users are allowed to add up to 4 cities
        </p>
      )}
    </div>
  );
};

export default SelectedCities;
