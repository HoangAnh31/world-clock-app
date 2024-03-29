import React, { useState, createContext, useContext } from "react";

const DataContext = createContext();

export const WorldClockDataProvider = ({ children }) => {
  const [listWorldClock, setListWorldClock] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);

  const setWorldClockData = (arrClock) => {
    setListWorldClock(arrClock);
  };

  return (
    <DataContext.Provider
      value={{ listWorldClock, setWorldClockData, currentTime, setCurrentTime }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
