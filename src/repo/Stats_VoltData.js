import { Box } from "@mui/system";
import StatsVoltDataModel from "../model/Stats_VoltDataModel";
import { Failure, Success } from "./api_status";


async function voltagefetchData() {
  try {
    console.log("Running fetch Data");
    const response = await fetch('http://localhost:3001/getData');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const dataVoltage = await response.json();
    const dataVoltageMain = dataVoltage.map((json)=>{
      return new StatsVoltDataModel(json.date,json.time,json.voltage,json.station);
    });
    console.log("List of model :",dataVoltageMain);
    if (dataVoltageMain.length === 0) {
      return new Failure(100, "No Data");
    } else {
      
            
      return new Success(200, dataVoltageMain);
    }

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Call the fetchData function when needed
export { voltagefetchData };