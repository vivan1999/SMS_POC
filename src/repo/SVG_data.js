import SVGDataModel from "../model/SVG_dataModel";
import { Failure, Success } from "./api_status";

// client.js (Browser)
async function fetchData() {
  try {
    console.log("Running fetch Data");
    const response = await fetch('http://localhost:3000/getData');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const svgData = data.map((json) => {
      return new SVGDataModel(json.trip_id, json.station_name, json.station_id, json.reached, json.condition, json.working);
    });
    if (svgData.length === 0) {
      return new Failure(100, "No Data");
    } else {
      return new Success(200, svgData);
    }
   

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Call the fetchData function when needed
export { fetchData };

