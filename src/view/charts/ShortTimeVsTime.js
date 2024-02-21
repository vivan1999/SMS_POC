import React, { useEffect, useRef, useState } from 'react';
//import * as d3 from 'd3';
import * as echarts from 'echarts';
import ReactEcharts from "echarts-for-react";
//import '@siemens/ix-echarts';



const timeData = [];
function ShortTimeVsTimeChart({ dataVoltageMain }) {

    //console.log("Area Chart Data :", data);

    const chartRef = useRef(null);

    const [_loadingChart, setLoadingChart] = useState(true);
    //console.log("running Area Chart function");
    var [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        if (dataVoltageMain.length === 0) {

        } else {
            setLoadingChart(true);


            const filteredData = dataVoltageMain.filter((record) => {
                const recordTime = record.time;
                const startTime = "00:00:00";
                const endTime = "24:00:00";

                // Convert the record time, start time, and end time to Date objects
                const recordDateTime = new Date(`1970-01-01T${recordTime}`);
                const startDateTime = new Date(`1970-01-01T${startTime}`);
                const endDateTime = new Date(`1970-01-01T${endTime}`);

                // Compare the record time with the start and end times
                return recordDateTime >= startDateTime && recordDateTime <= endDateTime;
            });

            // Define the time window in milliseconds (6 minutes)
            const tavwWindow = 6 * 60 * 1000;

            // Initialize variables to store the aggregated data
            const aggregatedData = [];
            
            const sortedData = filteredData.sort((a, b) => {

                const newTimeA = a.time;
                const newTimeB = b.time;
                const [hoursA, minutesA, secondsA] = newTimeA.split(':');
                const [hoursB, minutesB, secondsB] = newTimeB.split(':');
                const combinedDateA = new Date(2023, 1, 1, hoursA, minutesA, secondsA);
                const combinedDateB = new Date(2023, 1, 1, hoursB, minutesB, secondsB);

                const timeA = combinedDateA.getTime();
                const timeB = combinedDateB.getTime();
                
                return timeA - timeB;
            });
            console.log("Sorted Data CHART:", sortedData);



            const legendData = Array.from(new Set(sortedData.map((record) => record.station)));
            const seriesData = legendData.map((station) => ({
                name: station,
                type: 'line',
                data: sortedData.filter((record) => record.station === station).map((record) => ({ value: [record.time, parseFloat(record.averageVoltage)] }))
            }));
            const timeData = Array.from(new Set(sortedData.map((record) => record.time)));
         

            console.log("timeData Stats page :", timeData);
            console.log("Series Data :", seriesData);

            chartOptions = {
                tooltip: {
                    trigger: 'axis'

                },
                legend: {
                    data: legendData,
                },
               
                xAxis: {
                    type: "category",
                    data: timeData,
                },
                yAxis: {
                    type: "value"
                },
                series: seriesData,
                loading: _loadingChart

            };

            setChartOptions(chartOptions);
            setLoadingChart(false);
            
        }



    }, []);

    return (<div>{_loadingChart === false ? (
        //<div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
        <ReactEcharts option={chartOptions} style={{ width: '100%', height: '500px' }} />
    ) : (
        <div><h3>Loading...</h3></div>)}</div>);
   

}

export default ShortTimeVsTimeChart;
