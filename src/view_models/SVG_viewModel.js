import React, {createContext,useState, useEffect,useContext } from 'react';
import { fetchData } from '../repo/SVG_data';
import { Success } from '../repo/api_status';
//import { getCarouselData } from './api'; // Import your API functions

const SVGViewModelContext = createContext();


export function SVGViewModelProvider({ children }) {

  const [loading, setLoading] = useState(false);
  const [svgDataList, setSvgDataList] = useState([]);
  useEffect(() => {
    getSVGDataFromAPI();
  }, []);
  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  // Set carousel data
  const setSvgData = (data) => {
    setSvgDataList(data);
  };

  const getSVGDataFromAPI = async () => {
    setLoadingState(true);

    try {
      const response = await fetchData(); // Make an API call to get data
      if (response instanceof Success) {
        setSvgData(response.response);
        console.log('Success API Result');
      }
    } catch (error) {
      console.error('API Error:', error);
    }

    setLoadingState(false);
  };

  return (
    <SVGViewModelContext.Provider value={{ loading, svgDataList,setLoadingState }}>
      {children}
    </SVGViewModelContext.Provider>
  );
}

export function useSVGViewModel() {
  return useContext(SVGViewModelContext);
}

