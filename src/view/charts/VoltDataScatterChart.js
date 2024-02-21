// ScatterChart.js
import React, { useEffect, useRef } from 'react';
//import * as d3 from 'd3';
import * as echarts from 'echarts';
//import '@siemens/ix-echarts';





function ScatterChart({ data }) {
    console.log("Scatter Chart Data :", data);

    const chartRef1 = useRef(null);
    console.log("running Scatter Chart function");

    useEffect(() => {
        if (data.length === 0) {
            return;
        } else {

            var chartDom1 = chartRef1.current;
            var myChart1 = echarts.init(chartDom1);
            var option1;
            const groupedData = {};
            data.forEach((item) => {
                if (!groupedData[item.station]) {
                    groupedData[item.station] = [];
                }
                groupedData[item.station].push(item);
            });
            option1 = {

                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['voltage', 'time']
                }, grid: {
                    left: '7.8%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
               
                xAxis: {
                    type: 'category',
                    data: Object.keys(groupedData), // Unique labels
                    axisLabel: {
                        interval: 0,
                        rotate: -45, // Show all labels
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: false, // Hide Y-axis labels
                    }
                },
                series: Object.keys(groupedData).map((station) => ({
                    symbol: 'circle', // Set the symbol to a circle
                    symbolSize: 2.5, // Set the minimum radius to 0.05
                    itemStyle: {
                        color: 'black', // Set the color to black
                    },
                    type: 'scatter',
                    name: station,
                    data: groupedData[station].map((item) => ({
                        name: item.station,
                        value: [station, item.averageVoltage],
                    })),
                })),
            };

            myChart1.setOption(option1);

            // Clean up the chart when the component unmounts
            return () => {
                myChart1.dispose();
            };
        }

       


    }, [data]);
    return (
        <div ref={chartRef1} style={{ width: '100%', height: '500px' }}></div>
    );

}

export default ScatterChart;

