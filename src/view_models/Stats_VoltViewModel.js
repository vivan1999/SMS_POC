import React, { useState, useEffect, createContext, useContext } from 'react';
import { Success } from '../repo/api_status';
import { voltagefetchData } from '../repo/Stats_VoltData';
// Import your API functions

const StatsVoltViewModelContext = createContext();

export function StatsViewModelProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [dataVoltageMain, setVoltDataList] = useState([]);
  var [maxData, setMaxData] = useState([]);
  var [sepVoltageData, setSepVoltData] = useState([]);
  var [sepTimeData, setSepTimeData] = useState([]);
  var [aggregatedData, setAggregatedData] = useState([]);

  // This useEffect is equivalent to the constructor in Flutter
  useEffect(() => {
    getVoltDataFromAPI();
  }, []);

  // Set loading state
  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  // Set carousel data
  const setVoltData = (data) => {
    setVoltDataList(data);
  };
  const setMaxVoltData = (data) => {
    setMaxData(data);
  };
  const setSepVoltDataFunction = (data) => {
    setSepVoltData(data);
  };
  const setSepTimeDataFunction = (data) => {
    setSepTimeData(data);
  }

  const setAggregatedDataFunction = (data) => {
    setAggregatedData(data);
  }


  const calculateTAVW = (data) => {
    const tavwWindow = 6 * 60 * 1000; // 6 minutes in milliseconds
  
    const aggregatedData = [];
    const windows = {}; // Store window data for each station
  
    for (const record of data) {
      const recordTimestamp = new Date(`1970-01-01T${record.time}`).getTime();
      const station = record.station;
  
      if (!windows[station]) {
        windows[station] = {
          currentWindowStart: recordTimestamp,
          windowSum: 0,
          windowCount: 0,
        };
      }
  
      if (recordTimestamp - windows[station].currentWindowStart <= tavwWindow) {
        windows[station].windowSum += parseFloat(record.voltage);
        windows[station].windowCount += 1;
      } else {
        const windowAverage =
          windows[station].windowCount === 0
            ? 0
            : windows[station].windowSum / windows[station].windowCount;
  
        aggregatedData.push({
          station: station,
          time: record.time,
          averageVoltage: windowAverage,
        });
  
        // Move the window to the next position
        windows[station].currentWindowStart = recordTimestamp;
        windows[station].windowSum = parseFloat(record.voltage);
        windows[station].windowCount = 1;
      }
    }
  
    // Calculate TAVW for any remaining open windows
    for (const station in windows) {
      const window = windows[station];
      if (window.windowCount > 0) {
        const windowAverage = window.windowSum / window.windowCount;
        aggregatedData.push({
          station: station,
          time: data[data.length - 1].time,
          averageVoltage: windowAverage,
        });
      }
    }
  
    setAggregatedDataFunction(aggregatedData);
    console.log(aggregatedData);
  };
  
  const getVoltDataFromAPI = async () => {
    setLoadingState(true);

    try {
      const response = await voltagefetchData(); // Make an API call to get data
      if (response instanceof Success) {
        setVoltData(response.response);
        const stations = Array.from(new Set(response.response.map((item) => item.station)));
        maxData = [];
        setMaxVoltData(maxData);
        stations.forEach((station) => {
          const stationData = response.response.filter((item) => item.station === station);
          const maxValues = stationData.map((item) => parseFloat(item.voltage)).sort((a, b) => b - a);
          const minValues = stationData.map((item) => parseFloat(item.voltage)).sort((a, b) => a - b);
          maxData.push({
            station: station,
            type: 'line',
            max: maxValues.slice(0, 1)[0],
            min: minValues.slice(0, 1)[0]
          });
        });
        setMaxVoltData(maxData);
        sepVoltageData = response.response.map((record) => parseFloat(record.voltage)); // Assuming 'voltage' is the key for voltage in the data
        sepTimeData = response.response.map((record) => record.time);
        setSepVoltDataFunction(sepVoltageData);
        setSepTimeDataFunction(sepTimeData);
        console.log('Success API Result Stats Volt');
        calculateTAVW(response.response);
        console.log("calculated TAVW function");
      }
    } catch (error) {
      console.error('API Error:', error);
    }

    setLoadingState(false);
  };

  return (
    <StatsVoltViewModelContext.Provider value={{ loading, dataVoltageMain, maxData, sepVoltageData, sepTimeData, aggregatedData, setLoadingState }}>
      {children}
    </StatsVoltViewModelContext.Provider>
  );
}

export function useStatsVoltViewModel() {
  return useContext(StatsVoltViewModelContext);
}
